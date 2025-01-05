export const GENE_POSITIONS = {
  bodyColor: { start: 0, length: 4 },
  eyeColor: { start: 4, length: 4 },
  pattern: { start: 8, length: 4 },
  mouth: { start: 12, length: 4 },
};

export const decodeGenes = (genes: string): Record<string, string> => {
  const traits: Record<string, string> = {};
  
  Object.entries(GENE_POSITIONS).forEach(([trait, { start, length }]) => {
    traits[trait] = genes.substr(start, length);
  });
  
  return traits;
};

export const calculateRarity = (genes: string): string => {
  const traits = decodeGenes(genes);
  const rarityScore = Object.values(traits).reduce((score, trait) => {
    return score + parseInt(trait, 16);
  }, 0);
  
  if (rarityScore > 200) return "Legendary";
  if (rarityScore > 150) return "Epic";
  if (rarityScore > 100) return "Rare";
  return "Common";
};

export const generateRandomGenes = (): string => {
  let genes = "";
  for (let i = 0; i < 16; i++) {
    genes += Math.floor(Math.random() * 16).toString(16);
  }
  return genes;
};

export const breedKitties = (matronGenes: string, sireGenes: string): string => {
  let childGenes = "";
  for (let i = 0; i < matronGenes.length; i++) {
    // 50% chance to inherit from either parent
    childGenes += Math.random() < 0.5 ? matronGenes[i] : sireGenes[i];
  }
  return childGenes;
};