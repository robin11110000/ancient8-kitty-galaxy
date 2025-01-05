import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-purple-100 to-white">
      <div className="absolute inset-0 bg-[url('/kitty-pattern.png')] opacity-5" />
      <div className="container relative z-10 mx-auto px-4 py-32 text-center">
        <Badge className="mb-4 bg-purple-500 text-white animate-float">Welcome to Ancient8 Kitties</Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Collect & Breed Digital Cats
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Each cat is one-of-a-kind and 100% owned by you. It cannot be replicated, taken away, or destroyed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Start Collecting
          </Button>
          <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};