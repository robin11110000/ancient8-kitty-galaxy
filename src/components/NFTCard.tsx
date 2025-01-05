import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  rarity: string;
}

export const NFTCard = ({ id, name, image, price, rarity }: NFTCardProps) => {
  return (
    <Card className="hover-card glass-card overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        <Badge className="absolute top-2 right-2 bg-black/50 text-white backdrop-blur-sm">
          {rarity}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{price} ETH</span>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};