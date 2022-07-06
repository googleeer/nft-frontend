export interface Drop {
  id: number;
  name: string;
  artist: string;
  drops: Array<Drop>;
  canBeUsed?: boolean;
}
