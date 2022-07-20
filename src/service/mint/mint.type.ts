import { CdnFile } from "@/service/commonTypes/commonTypes";

export interface Mint {
  mintCount: number;
  drop: Drop;
}
interface Drop {
  name: string;
  id: number;
  animationDuration: string;
  nftModel: CdnFile;
  nftModelScene: CdnFile;
}
