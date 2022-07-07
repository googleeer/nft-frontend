import { Drop } from "@/service/drop/drop.type";

export interface Perk {
  id: number;
  name: string;
  description: string;
  description_es: string;
  endingDate: string | null;
  slots: Slots;
  active: boolean;
}
interface Slots {
  count: number;
  openingNewSlot: boolean;
}
export type PerkWithDrops = Perk & { drops: Drop[] };
