# Ancient8 Kitties Smart Contracts

This is the smart contract implementation for Ancient8 Kitties, based on the CryptoKitties bounty project but adapted for Ancient8's L2.

## Key Features

- ERC721 token implementation for NFT kitties
- Genetic inheritance system
- Breeding mechanics with cooldowns
- Generation tracking
- Owner-only Gen0 kitty creation

## Deployment

To deploy these contracts to Ancient8's L2:

1. Install Hardhat or Foundry
2. Configure your Ancient8 RPC endpoint
3. Deploy using your preferred deployment tool
4. Verify the contract on Ancient8's block explorer

## Contract Architecture

The main contract is `KittyCore.sol` which handles:
- Kitty creation and ownership
- Breeding mechanics
- Genetic inheritance
- Cooldown system

## Testing

Write comprehensive tests before deploying to mainnet. Key areas to test:
- Breeding mechanics
- Genetic inheritance
- Cooldown enforcement
- Owner functions
- Access control

## Security Considerations

- The contract inherits from OpenZeppelin's secure implementations
- Includes pause functionality for emergency stops
- Access control for admin functions
- Cooldown system to prevent breeding spam

## Integration with Frontend

The frontend should interact with this contract through:
- Web3 provider (e.g., ethers.js)
- Contract ABI
- Ancient8 wallet integration