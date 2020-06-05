package main

import (
	"bernd/media"
	"fmt"
	"log"
	"os/user"
	"path"
	"path/filepath"
	"time"

	"github.com/gen2brain/dlgs"
	. "github.com/kkdai/youtube"
	"github.com/leaanthony/mewn"
	"github.com/saaymeen/temppeg/transcoder"
	"github.com/wailsapp/wails"
)

func basic() string {
	return "World!"
}

var trans *transcoder.Transcoder
var videoDir string
var selectedFilePath string

func timestamp() string {
	t := time.Now()
	return t.Format("2006-Jan-Mon-15-04-05")
}

func main() {

	trans = new(transcoder.Transcoder)

	usr, _ := user.Current()
	videoDir = fmt.Sprintf("%v/Videos", usr.HomeDir)

	js := mewn.String("./frontend/build/static/js/main.js")
	css := mewn.String("./frontend/build/static/css/main.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:     800,
		Height:    400,
		Title:     "Bernd",
		JS:        js,
		CSS:       css,
		Colour:    "#131313",
		Resizable: true,
	})

	app.Bind(convert)
	app.Bind(pick)
	app.Bind(download)
	app.Run()
}

func convert() string {
	err := trans.Initialize(selectedFilePath, path.Join(videoDir, "convert-"+timestamp()+".avi"))
	if err != nil {
		log.Print(err.Error())
		return "UNINITIALIZED"
	}

	trans.MediaFile().SetVideoCodec("mpeg4")
	trans.MediaFile().SetQScale(5)
	trans.MediaFile().SetVTag("xvid")

	done := trans.Run(false)
	err = <-done

	if err != nil {
		log.Print(err.Error())
		return "CONVERSION_ERROR"
	}

	// ffmpeg -i input.mp4 -vcodec mpeg4 -q:v 5 -vtag xvid output.avi
	// exec.Command("ffmpeg", "-loop", "1", "-t", "5", "-i", "img-0.png", "-loop",  "1", "-t", "5", "-i", "img-1.png", "-loop", "1", "-t", "5", "-i", "img-2.png", "-filter_complex", "[1:v][0:v]blend=all_expr='A*(if(gte(T,0.5),1,T/0.5))+B*(1-(if(gte(T,0.5),1,T/0.5)))'[b1v];[2:v][1:v]blend=all_expr='A*(if(gte(T,0.5),1,T/0.5))+B*(1-(if(gte(T,0.5),1,T/0.5)))'[b2v];[0:v][b1v][1:v][b2v][2:v]concat=n=5:v=1:a=0,format=yuv420p[v]", "-map", "[v]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30", "-s", "1280x720", "-aspect", "16:9", "-crf", "1", "-preset", "ultrafast", "output.mp4")
	return "SUCCESS"
}

func download(url string) string {
	y := NewYoutube(false)

	if err := y.DecodeURL(url); err != nil {
		log.Println(err.Error())
		return "FAILED_DECODE"
	}

	if err := y.StartDownload(filepath.Join(videoDir, "youtube-download-"+timestamp()+".mp4")); err != nil {
		log.Println(err.Error())
		return "FAILED_DOWNLOAD"
	}

	return "SUCCESS"
}

func pick() (*media.File, error) {
	path, _, err := dlgs.File("Datei auswählen", "", false)

	if err != nil {
		log.Print(err.Error())
		return nil, err
	}

	selectedFilePath = path

	err = trans.Initialize(selectedFilePath, "")
	if err != nil {
		log.Print(err.Error())
		return nil, err
	}

	metadata := trans.MediaFile().Metadata()

	return &media.File{Name: filepath.Base(selectedFilePath), Folder: filepath.Dir(selectedFilePath), Duration: metadata.Format.Duration, Size: metadata.Format.Size, Bitrate: metadata.Format.BitRate, Format: metadata.Format.FormatLongName}, nil
}
