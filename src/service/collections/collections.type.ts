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
export type CollectionWithDrops = Collection & { drops: Drop[] };
