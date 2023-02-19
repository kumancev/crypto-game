const hre = require("hardhat");

// async function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve, ms);
//   });
// }

async function main() {
  const initialAmount = hre.ethers.utils.parseEther("0.1");

  const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");
  const coinFlip = await CoinFlip.deploy({ value: initialAmount });

  await coinFlip.deployed();
  console.log(`CoinFlip contract deployed to ${coinFlip.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
