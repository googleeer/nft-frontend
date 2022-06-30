export interface Collection {
  id: number;
  name: string;
  artist: string;
  isComingSoon: string;
}
export interface Drop {
  id: number;
  name: string;
  artist: string;
  drops: Array<Drop>;
}
export interface Perk {
  id: number;
  name: string;
  description: string;
  description_es: string;
  endingDate: string;
}
export type CollectionWithDrops = Collection & { drops: Drop[] };
