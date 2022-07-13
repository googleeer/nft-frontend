import { Drop } from "@/service/drop/drop.type";
import {
  ElementDescription,
  SceneImages,
} from "@/service/commonTypes/commonTypes";

export type Collection = SceneImages &
  ElementDescription & {
    id: number;
    name: string;
    artist: string;
    isComingSoon: boolean;
  };
export type CollectionWithDrops = Collection & { drops: Drop[] };
