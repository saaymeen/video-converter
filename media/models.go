package media

type File struct {
	Name string `json:"name"`
	Folder string `json:"folder"`
	Bitrate string `json:"bitrate"`
	Duration string `json:"duration"`
	Size string `json:"size"`
	Format string `json:"format"`
}