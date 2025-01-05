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
    <Card className="hover-card overflow-hidden bg-white border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
      <div className="relative aspect-square p-4">
        <img
          src={image}
          alt={name}
          className="object-contain w-full h-full rounded-lg"
          loading="lazy"
        />
        <Badge className="absolute top-6 right-6 bg-purple-500">
          {rarity}
        </Badge>
      </div>
      <div className="p-4 border-t border-purple-100">
        <h3 className="font-bold text-lg mb-2 text-purple-900">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-purple-600">{price} ETH</span>
          <Button variant="outline" size="sm" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};