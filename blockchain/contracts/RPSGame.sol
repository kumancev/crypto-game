pragma solidity ^0.8.0;

contract RPSGame {
    uint256 public priceOneGame = 0.1 ether;
    address payable public owner;

    event GameResult(address player, uint8 playerChoice, uint8 contractChoice, bool playerWon);

    constructor() payable {
        require(msg.value >= priceOneGame * 3, "The contract must be funding with amount of least 3 times more than the price one game");
        owner = payable(msg.sender);
    }

    modifier _onlyOwner() {
        require(msg.sender == owner, "You're not owner!");
        _;
    }

    function play(uint8 _choice) public payable {
        require(msg.value == priceOneGame, "You sent an insufficient amount. Price of one game 0.1 BNB!");
        require(_choice < 3 || _choice > 0, "Choice must be equal from 0 to 2");

        uint8 contractChoice = randomChoice();
        bool playerWon = false;

        if ((_choice == 0 && contractChoice == 2) || (_choice == 1 && contractChoice == 0) || (_choice == 2 && contractChoice == 1)) {
            playerWon = true;
            payable(msg.sender).transfer(priceOneGame * 3);
        }

        emit GameResult(msg.sender, _choice, contractChoice, playerWon);
    }

    function randomChoice() private view returns(uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty)))) % 3;
    }

    function withdraw() public _onlyOwner {
        owner.transfer(address(this).balance);
    }
}