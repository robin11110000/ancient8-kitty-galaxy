import { NFTCard } from "./NFTCard";

const SAMPLE_NFTS = [
  {
    id: "1",
    name: "Cosmic Kitten #1",
    image: "/placeholder.svg",
    price: "0.5",
    rarity: "Rare",
  },
  {
    id: "2",
    name: "Mystic Kitten #2",
    image: "/placeholder.svg",
    price: "0.8",
    rarity: "Epic",
  },
  {
    id: "3",
    name: "Galaxy Kitten #3",
    image: "/placeholder.svg",
    price: "1.2",
    rarity: "Legendary",
  },
  {
    id: "4",
    name: "Nebula Kitten #4",
    image: "/placeholder.svg",
    price: "0.3",
    rarity: "Common",
  },
];

export const NFTGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {SAMPLE_NFTS.map((nft) => (
        <NFTCard key={nft.id} {...nft} />
      ))}
    </div>
  );
};