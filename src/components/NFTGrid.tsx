import { useState, useEffect } from "react";
import { NFTCard } from "./NFTCard";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { generateRandomGenes, breedKitties } from "@/utils/genetics";
import { checkAchievements } from "@/utils/gameplayUtils";
import type { KittyDisplay } from "@/types/kitty";

// Sample data - in a real app this would come from your blockchain connection
const generateSampleKitty = (id: string): KittyDisplay => ({
  id,
  genes: generateRandomGenes(),
  generation: Math.floor(Math.random() * 5),
  birthTime: Date.now(),
  cooldownEndTime: Date.now(),
  matronId: "0",
  sireId: "0",
  breedCount: 0,
  owner: "0x123...",
  name: `Kitty #${id}`,
  image: "/placeholder.svg",
  price: (Math.random() * 2 + 0.1).toFixed(2),
  rarity: "Common"
});

const INITIAL_KITTIES = Array.from({ length: 8 }, (_, i) => 
  generateSampleKitty(i.toString())
);

export const NFTGrid = () => {
  const [kitties, setKitties] = useState<KittyDisplay[]>(INITIAL_KITTIES);
  const [selectedForBreeding, setSelectedForBreeding] = useState<string[]>([]);
  const [isSpecialEvent, setIsSpecialEvent] = useState(false);
  
  useEffect(() => {
    // In a real implementation, this would check for active special events
    const checkForSpecialEvents = async () => {
      setIsSpecialEvent(false); // Placeholder
    };
    
    checkForSpecialEvents();
  }, []);

  const handleBreedSelection = (kittyId: string) => {
    if (selectedForBreeding.includes(kittyId)) {
      setSelectedForBreeding(prev => prev.filter(id => id !== kittyId));
    } else if (selectedForBreeding.length < 2) {
      setSelectedForBreeding(prev => [...prev, kittyId]);
    } else {
      toast({
        title: "Breeding Selection",
        description: "You can only select two kitties for breeding",
        variant: "destructive"
      });
    }
  };

  const handleBreed = async () => {
    if (selectedForBreeding.length !== 2) return;

    const matron = kitties.find(k => k.id === selectedForBreeding[0]);
    const sire = kitties.find(k => k.id === selectedForBreeding[1]);

    if (!matron || !sire) return;

    try {
      const newGenes = isSpecialEvent 
        ? breedKitties(matron.genes, sire.genes) + "F" // Add special trait
        : breedKitties(matron.genes, sire.genes);
        
      const newKitty: KittyDisplay = {
        ...generateSampleKitty((kitties.length + 1).toString()),
        genes: newGenes,
        generation: Math.max(matron.generation, sire.generation) + 1,
        matronId: matron.id,
        sireId: sire.id,
      };

      setKitties(prev => [...prev, newKitty]);
      setSelectedForBreeding([]);
      
      // Check for achievements
      await checkAchievements("sample-address", newGenes, newKitty.breedCount);
      
      toast({
        title: "New Kitty Born!",
        description: `Successfully bred a new Gen ${newKitty.generation} kitty!${
          isSpecialEvent ? " With special traits!" : ""
        }`
      });
    } catch (error) {
      console.error("Error breeding kitties:", error);
      toast({
        title: "Breeding Failed",
        description: "There was an error while breeding the kitties",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {isSpecialEvent && (
        <div className="p-4 bg-purple-100 rounded-lg text-purple-800 text-center animate-pulse">
          🎉 Special Breeding Event Active! Breed now for a chance at rare traits! 🎉
        </div>
      )}
      
      {selectedForBreeding.length > 0 && (
        <div className="flex items-center justify-center gap-4 p-4 bg-purple-50 rounded-lg">
          <span className="text-purple-600">
            Selected for breeding: {selectedForBreeding.length}/2
          </span>
          {selectedForBreeding.length === 2 && (
            <Button
              onClick={handleBreed}
              className="bg-pink-600 hover:bg-pink-700"
            >
              {isSpecialEvent ? "Special Breed" : "Breed"} Selected Kitties
            </Button>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
        {kitties.map((kitty) => (
          <NFTCard
            key={kitty.id}
            kitty={kitty}
            onBreed={handleBreedSelection}
          />
        ))}
      </div>
    </div>
  );
};