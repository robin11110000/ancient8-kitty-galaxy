import { NFTCard } from "./NFTCard";

const SAMPLE_NFTS = [
  {
    id: "1",
    name: "Gen 0 Founder Kitty",
    image: "/placeholder.svg",
    price: "2.5",
    rarity: "Genesis",
  },
  {
    id: "2",
    name: "Fancy Kitty",
    image: "/placeholder.svg",
    price: "1.8",
    rarity: "Fancy",
  },
  {
    id: "3",
    name: "Exclusive Kitty",
    image: "/placeholder.svg",
    price: "3.2",
    rarity: "Exclusive",
  },
  {
    id: "4",
    name: "Normal Kitty",
    image: "/placeholder.svg",
    price: "0.5",
    rarity: "Normal",
  },
];

export const NFTGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
      {SAMPLE_NFTS.map((nft) => (
        <NFTCard key={nft.id} {...nft} />
      ))}
    </div>
  );
};