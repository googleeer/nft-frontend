import { Drop } from "@/service/drop/drop.type";

export interface Collection {
  id: number;
  name: string;
  artist: string;
  isComingSoon: string;
}
export type CollectionWithDrops = Collection & { drops: Drop[] };
