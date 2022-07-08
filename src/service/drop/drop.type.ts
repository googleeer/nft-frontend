import { SceneImages } from "@/service/commonTypes/commonTypes";

export type Drop = SceneImages & {
  id: number;
  name: string;
  artist: string;
  drops: Array<Drop>;
  canBeUsed?: boolean;
};
