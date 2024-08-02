const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const PERC20Sample = await ethers.getContractFactory("PERC20Sample");

  console.log("Deploying the contract...");
  
  // Deploy the contract
  const perc20 = await PERC20Sample.deploy();
  console.log("Contract deployment transaction sent...");

  // Log the transaction details
  console.log(`Transaction Hash: ${perc20.deploymentTransaction().hash}`);

  // Wait for the transaction to be mined
  const receipt = await perc20.deploymentTransaction().wait(2);
  
  // Log the transaction receipt details
  console.log("Transaction mined:");
  console.log(`Block Number: ${receipt.blockNumber}`);
  console.log(`Gas Used: ${receipt.gasUsed.toString()}`);
  
  // Log the address of the deployed contract
  console.log(`PERC20Sample was deployed to ${perc20.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
