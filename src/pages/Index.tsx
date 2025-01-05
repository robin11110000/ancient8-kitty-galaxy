import { Hero } from "@/components/Hero";
import { NFTGrid } from "@/components/NFTGrid";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Hero />
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">Featured Kitties</h2>
        <NFTGrid />
      </section>
    </main>
  );
};

export default Index;