import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { decodeGenes, calculateRarity } from "@/utils/genetics";
import type { KittyDisplay } from "@/types/kitty";
import { useState } from "react";

interface NFTCardProps {
  kitty: KittyDisplay;
  onBreed?: (kittyId: string) => void;
}

export const NFTCard = ({ kitty, onBreed }: NFTCardProps) => {
  const [showGenes, setShowGenes] = useState(false);
  const traits = decodeGenes(kitty.genes);
  const rarity = calculateRarity(kitty.genes);

  return (
    <Card className="hover-card overflow-hidden bg-white border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
      <div className="relative aspect-square p-4">
        <img
          src={kitty.image}
          alt={kitty.name}
          className="object-contain w-full h-full rounded-lg"
          loading="lazy"
        />
        <Badge className="absolute top-6 right-6 bg-purple-500">
          {rarity}
        </Badge>
        <Badge className="absolute top-6 left-6 bg-blue-500">
          Gen {kitty.generation}
        </Badge>
      </div>
      <div className="p-4 border-t border-purple-100">
        <h3 className="font-bold text-lg mb-2 text-purple-900">{kitty.name}</h3>
        
        {showGenes && (
          <div className="mb-3 grid grid-cols-2 gap-2">
            {Object.entries(traits).map(([trait, value]) => (
              <div key={trait} className="text-xs">
                <span className="font-medium text-purple-600">{trait}:</span>
                <span className="ml-1 text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-purple-600">{kitty.price} ETH</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
              onClick={() => setShowGenes(!showGenes)}
            >
              {showGenes ? 'Hide Genes' : 'Show Genes'}
            </Button>
            {onBreed && (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-pink-600 text-pink-600 hover:bg-pink-50"
                onClick={() => onBreed(kitty.id)}
              >
                Breed
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};