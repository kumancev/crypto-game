// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract CoinFlip is VRFV2WrapperConsumerBase {
    
    event CoinFlipRequest(uint256 requestId);
    event CoinFlipResult(uint256 requestId, bool didWin);

    struct CoinFlipStatus {
        uint256 fees;
        uint256 randomWord;
        address player;
        bool didWin;
        bool fulfilled;
        CoinFlipSelection choise;
    }

    enum CoinFlipSelection {
        HEADS,
        TAILS
    }

    mapping(uint256 => CoinFlipStatus) public statuses;

    address constant linkAddress = 0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06;
    address constant vrfWrapperAddress = 0x6A2AAd07396B36Fe02a22b33cf443582f682c82f;

    uint128 constant entryFees = 0.05 ether;
    uint32 constant callbackGasLimit = 2500000;
    uint32 constant numWords = 1;
    uint16 constant requestConfirmations = 3; 

    constructor()
        payable 
        VRFV2WrapperConsumerBase(linkAddress, vrfWrapperAddress) 
    {}

    function flip(CoinFlipSelection choise) 
        external    
        payable 
        returns (uint256) 
    {
        require(msg.value == entryFees, "Entry fees not sent");

        uint256 requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );

        statuses[requestId] = CoinFlipStatus({
            fees: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            randomWord: 0,
            player: msg.sender,
            didWin: false,
            fulfilled: false,
            choise: choise
        });

        emit CoinFlipRequest(requestId);
        return requestId;
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) 
        internal
        override
    {
        require(statuses[requestId].fees > 0, "Request not found");

        statuses[requestId].fulfilled = true;
        statuses[requestId].randomWord = randomWords[0];

        CoinFlipSelection result = CoinFlipSelection.HEADS;
        if (randomWords[0] % 2 == 0) {
            result = CoinFlipSelection.TAILS;
        }

        if (statuses[requestId].choise == result) {
            statuses[requestId].didWin = true;
            payable(statuses[requestId].player).transfer(entryFees * 2);
        }

        emit CoinFlipResult(requestId, statuses[requestId].didWin);
    }

    function getStatus(uint256 requestId) 
        public 
        view 
        returns (CoinFlipStatus memory)
    {
        return statuses[requestId];
    }

}
