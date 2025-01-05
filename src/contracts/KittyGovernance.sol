// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./KittyCore.sol";

contract KittyGovernance is AccessControl {
    bytes32 public constant GAME_MASTER = keccak256("GAME_MASTER");
    KittyCore public kittyCore;
    IERC20 public governanceToken;
    
    struct BreedingEvent {
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 requiredStake;
        bool specialTraitsEnabled;
        mapping(address => uint256) participantStakes;
    }
    
    mapping(uint256 => BreedingEvent) public breedingEvents;
    uint256 public currentEventId;
    
    // Gameplay rewards
    mapping(address => uint256) public playerPoints;
    mapping(address => uint256) public playerLevel;
    
    event BreedingEventCreated(uint256 indexed eventId, string name, uint256 startTime, uint256 endTime);
    event PlayerRewardEarned(address indexed player, uint256 points, string achievement);
    
    constructor(address _kittyCoreAddress, address _governanceTokenAddress) {
        kittyCore = KittyCore(_kittyCoreAddress);
        governanceToken = IERC20(_governanceTokenAddress);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(GAME_MASTER, msg.sender);
    }
    
    function createBreedingEvent(
        string memory _name,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _requiredStake,
        bool _specialTraitsEnabled
    ) external onlyRole(GAME_MASTER) {
        currentEventId++;
        BreedingEvent storage newEvent = breedingEvents[currentEventId];
        newEvent.name = _name;
        newEvent.startTime = _startTime;
        newEvent.endTime = _endTime;
        newEvent.requiredStake = _requiredStake;
        newEvent.specialTraitsEnabled = _specialTraitsEnabled;
        
        emit BreedingEventCreated(currentEventId, _name, _startTime, _endTime);
    }
    
    function participateInEvent(uint256 _eventId) external {
        BreedingEvent storage event_ = breedingEvents[_eventId];
        require(block.timestamp >= event_.startTime, "Event not started");
        require(block.timestamp <= event_.endTime, "Event ended");
        require(event_.participantStakes[msg.sender] == 0, "Already participating");
        
        governanceToken.transferFrom(msg.sender, address(this), event_.requiredStake);
        event_.participantStakes[msg.sender] = event_.requiredStake;
    }
    
    function awardPoints(address _player, uint256 _points, string memory _achievement) 
        external 
        onlyRole(GAME_MASTER) 
    {
        playerPoints[_player] += _points;
        
        // Level up system
        uint256 newLevel = (playerPoints[_player] / 1000) + 1;
        if (newLevel > playerLevel[_player]) {
            playerLevel[_player] = newLevel;
        }
        
        emit PlayerRewardEarned(_player, _points, _achievement);
    }
    
    function getPlayerStats(address _player) 
        external 
        view 
        returns (uint256 points, uint256 level) 
    {
        return (playerPoints[_player], playerLevel[_player]);
    }
}