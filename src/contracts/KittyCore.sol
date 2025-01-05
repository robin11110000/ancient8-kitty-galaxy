// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract KittyCore is ERC721, Ownable, Pausable {
    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint64 cooldownEndBlock;
        uint32 matronId;
        uint32 sireId;
        uint32 generation;
        uint16 cooldownIndex;
    }

    uint256 public constant CREATION_LIMIT_GEN0 = 50000;
    uint256 public gen0Counter;

    Kitty[] kitties;

    event Birth(
        address owner,
        uint256 kittyId,
        uint256 matronId,
        uint256 sireId,
        uint256 genes
    );

    constructor() ERC721("Ancient8Kitties", "A8K") {}

    // New variables for special breeding events
    address public governanceContract;
    mapping(uint256 => bool) public specialTraitKitties;
    
    event SpecialTraitAssigned(uint256 indexed kittyId, uint256 indexed eventId);
    
    function setGovernanceContract(address _governanceContract) external onlyOwner {
        governanceContract = _governanceContract;
    }
    
    function breedWithSpecialTrait(uint256 _matronId, uint256 _sireId, uint256 _eventId) 
        external 
    {
        require(governanceContract != address(0), "Governance not set");
        require(
            KittyGovernance(governanceContract).breedingEvents(_eventId).specialTraitsEnabled,
            "Special traits not enabled for this event"
        );
        
        // Perform normal breeding
        uint256 newKittyId = _createKitty(_matronId, _sireId, 0, generateSpecialGenes(), msg.sender);
        
        // Mark kitty as having special traits
        specialTraitKitties[newKittyId] = true;
        
        emit SpecialTraitAssigned(newKittyId, _eventId);
    }
    
    function generateSpecialGenes() internal view returns (uint256) {
        // Generate special genes with rare traits
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) | 0xFF000000;
    }

    function createGen0Kitty(uint256 _genes) external onlyOwner {
        require(gen0Counter < CREATION_LIMIT_GEN0, "Gen0 limit reached");
        
        gen0Counter++;
        _createKitty(0, 0, 0, _genes, msg.sender);
    }

    function breed(uint256 _matronId, uint256 _sireId) external {
        require(_owns(msg.sender, _matronId), "Must own matron");
        require(_owns(msg.sender, _sireId), "Must own sire");
        
        Kitty storage matron = kitties[_matronId];
        Kitty storage sire = kitties[_sireId];
        
        require(_isReadyToBreed(matron), "Matron not ready");
        require(_isReadyToBreed(sire), "Sire not ready");

        uint256 childGenes = _mixGenes(matron.genes, sire.genes);
        uint256 generation = max(matron.generation, sire.generation) + 1;
        
        _createKitty(_matronId, _sireId, generation, childGenes, msg.sender);
        
        // Update parents' cooldowns
        _triggerCooldown(matron);
        _triggerCooldown(sire);
    }

    function _createKitty(
        uint256 _matronId,
        uint256 _sireId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) internal returns (uint256) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            cooldownEndBlock: 0,
            matronId: uint32(_matronId),
            sireId: uint32(_sireId),
            generation: uint32(_generation),
            cooldownIndex: 0
        });

        uint256 newKittyId = kitties.length;
        kitties.push(_kitty);
        _safeMint(_owner, newKittyId);

        emit Birth(
            _owner,
            newKittyId,
            _matronId,
            _sireId,
            _genes
        );

        return newKittyId;
    }

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return ownerOf(_tokenId) == _claimant;
    }

    function _isReadyToBreed(Kitty storage _kit) internal view returns (bool) {
        return _kit.cooldownEndBlock <= block.number;
    }

    function _triggerCooldown(Kitty storage _kit) internal {
        _kit.cooldownEndBlock = uint64(block.number + cooldowns[_kit.cooldownIndex]);
        
        if (_kit.cooldownIndex < 13) {
            _kit.cooldownIndex += 1;
        }
    }

    function _mixGenes(uint256 _genes1, uint256 _genes2) internal pure returns (uint256) {
        // Simple gene mixing for demonstration
        // In production, this would be more complex
        uint256 mask = 0xFFFFFFFF;
        uint256 random = uint256(keccak256(abi.encodePacked(_genes1, _genes2)));
        
        return (random & mask) | (_genes2 & ~mask);
    }

    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    // Cooldown duration in blocks for each cooldown index
    uint32[14] public cooldowns = [
        uint32(1 minutes),
        uint32(2 minutes),
        uint32(5 minutes),
        uint32(10 minutes),
        uint32(30 minutes),
        uint32(1 hours),
        uint32(2 hours),
        uint32(4 hours),
        uint32(8 hours),
        uint32(16 hours),
        uint32(1 days),
        uint32(2 days),
        uint32(4 days),
        uint32(7 days)
    ];
}
