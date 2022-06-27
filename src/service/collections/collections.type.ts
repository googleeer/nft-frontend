export interface Collection {
  id: number;
  name: string;
  artist: string;
}
interface Drop {
  id: number;
  name: string;
  artist: string;
}
export type CollectionWithDrops = Collection & { drops: Drop[] };
