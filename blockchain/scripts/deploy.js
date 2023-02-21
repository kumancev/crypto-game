const hre = require("hardhat");

async function main() {
  const initialAmount = hre.ethers.utils.parseEther("0.6");

  const RPSGame = await hre.ethers.getContractFactory("RPSGame");
  const contract = await RPSGame.deploy({ value: initialAmount });

  await contract.deployed();
  console.log(`RPSGame contract deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
