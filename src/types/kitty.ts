export interface Kitty {
  id: string;
  genes: string;
  generation: number;
  birthTime: number;
  cooldownEndTime: number;
  matronId: string;
  sireId: string;
  breedCount: number;
  owner: string;
}

export interface KittyDisplay extends Kitty {
  name: string;
  image: string;
  price: string;
  rarity: string;
}

export type GeneticTrait = {
  name: string;
  value: string;
  rarity: number;
};