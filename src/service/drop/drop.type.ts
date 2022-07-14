import {
  CdnFile,
  ElementDescription,
  SceneImages,
} from "@/service/commonTypes/commonTypes";
import { Perk } from "@/service/perk/perk.type";
import { Collection } from "@/service/collections/collections.type";

export type Drop = SceneImages &
  ElementDescription & {
    id: number;
    name: string;
    artist: string;
    perks: Array<Perk>;
    canBeUsed?: boolean;
    collection: Collection;
    dropPreview: CdnFile;
    nftPreview: CdnFile;
  };
