export interface Perk {
  id: number;
  name: string;
  description: string;
  description_es: string;
  endingDate: string | null;
  slots: number;
  active: boolean;
}
