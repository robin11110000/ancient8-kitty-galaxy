import { toast } from "@/components/ui/use-toast";

export interface PlayerStats {
  points: number;
  level: number;
}

export const ACHIEVEMENTS = {
  FIRST_BREED: {
    name: "First Blood",
    points: 100,
    description: "Breed your first kitty"
  },
  RARE_TRAIT: {
    name: "Genetic Master",
    points: 250,
    description: "Breed a kitty with a rare trait"
  },
  EVENT_WINNER: {
    name: "Event Champion",
    points: 500,
    description: "Win a breeding event"
  }
} as const;

export const checkAchievements = async (
  playerAddress: string,
  kittyGenes: string,
  breedCount: number
): Promise<void> => {
  try {
    // First breeding achievement
    if (breedCount === 1) {
      await awardAchievement(playerAddress, ACHIEVEMENTS.FIRST_BREED);
    }
    
    // Rare trait achievement
    const hasRareTrait = checkForRareTraits(kittyGenes);
    if (hasRareTrait) {
      await awardAchievement(playerAddress, ACHIEVEMENTS.RARE_TRAIT);
    }
    
  } catch (error) {
    console.error("Error checking achievements:", error);
  }
};

const checkForRareTraits = (genes: string): boolean => {
  // Check if genes contain rare patterns (0xF in any trait position)
  return genes.includes("F");
};

const awardAchievement = async (
  playerAddress: string,
  achievement: typeof ACHIEVEMENTS[keyof typeof ACHIEVEMENTS]
) => {
  // In a real implementation, this would call the smart contract
  toast({
    title: `Achievement Unlocked: ${achievement.name}`,
    description: `${achievement.description} (+${achievement.points} points)`,
  });
};