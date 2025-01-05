import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50 z-0" />
      <div className="container relative z-10 mx-auto px-4 py-32 text-center">
        <Badge className="mb-4 animate-float">Featured Collection</Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Discover Unique Digital Kittens
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Collect, breed, and trade unique digital cats on the blockchain. Each kitten is one-of-a-kind and 100% owned by you.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">
            Explore Collection
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};