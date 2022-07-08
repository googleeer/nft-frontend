import { Drop } from "@/service/drop/drop.type";
import { SceneImages } from "@/service/commonTypes/commonTypes";

export type Collection = SceneImages & {
  id: number;
  name: string;
  artist: string;
  isComingSoon: string;
};
export type CollectionWithDrops = Collection & { drops: Drop[] };
