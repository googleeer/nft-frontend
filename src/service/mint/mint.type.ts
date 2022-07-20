import { CdnFile } from "@/service/commonTypes/commonTypes";
import { Perk } from "@/service/perk/perk.type";

export interface Mint {
  mintCount: number;
  drop: Drop;
  userPerks: Perk[];
}
interface Drop {
  name: string;
  id: number;
  animationDuration: string;
  nftModel: CdnFile;
  nftModelScene: CdnFile;
}
