import {
  ElementDescription,
  SceneImages,
} from "@/service/commonTypes/commonTypes";

export type Drop = SceneImages &
  ElementDescription & {
    id: number;
    name: string;
    artist: string;
    drops: Array<Drop>;
    canBeUsed?: boolean;
  };
