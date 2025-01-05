import { Hero } from "@/components/Hero";
import { NFTGrid } from "@/components/NFTGrid";

const Index = () => {
  return (
    <main className="min-h-screen page-transition">
      <Hero />
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured NFTs</h2>
        <NFTGrid />
      </section>
    </main>
  );
};

export default Index;