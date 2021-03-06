export interface CdnFile {
  id: number;
  url: string;
  key: string;
}

export interface SceneImages {
  background?: CdnFile;
  artistLogo?: CdnFile;
  brandLogo?: CdnFile;
  cube?: CdnFile;
  canvas?: CdnFile;
}

export interface ElementDescription {
  description: string;
  description_es: string;
  shortDescription: string;
  shortDescription_es: string;
}
