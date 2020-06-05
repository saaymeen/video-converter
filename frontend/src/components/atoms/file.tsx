//export type MediaFile = {
//	name: string;
//	folder:string;
//	bitrate: string;
//	duration: string;
//	size: string;
//	format:string
//}

export class MediaFile {
  public name: string = "";
  public folder: string = "";
  public bitrate: string = "";
  public duration: string = "";
  public size: string = "";
  public format: string = "";

  public getPropertyTuples(): [string, string][] {
    return [
      ["Datei", this.name],
      ["Ordner", this.folder],
      ["Bitrate", this.bitrate],
      ["Länge", this.duration],
      ["Größe", this.size],
      ["Format", this.format],
    ];
  }
}
