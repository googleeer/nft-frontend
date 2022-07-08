export interface CdnFile {
  id: number;
  url: string;
  key: string;
}

export interface SceneImages {
  background: CdnFile;
  artistLogo: CdnFile;
  brandLogo: CdnFile;
  cube: CdnFile;
  leftColumn: CdnFile;
  rightColumn: CdnFile;
}
