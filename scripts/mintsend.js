require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  // Connect to the network
  const provider = new ethers.JsonRpcProvider("https://json-rpc.testnet.swisstronik.com/");
  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Get the deployed contract instance
  const contractAddress = "0x672C9FcF46c29f3d6A0c5c0Db00986C9d86F853C";
  const PERC20Sample = await ethers.getContractFactory("PERC20Sample", deployer);
  const perc20 = PERC20Sample.attach(contractAddress);

  try {
    // Mint 1000 tokens to the deployer's address
    console.log("Minting 1000 tokens...");
    const mintTx = await perc20.mint(deployer.address, ethers.parseUnits("1000", 18), {
      gasLimit: 2000000
    });
    await mintTx.wait();
    console.log(`Mint transaction hash: ${mintTx.hash}`);
  } catch (error) {
    console.error("Minting failed:", error);
  }

  try {
    // Transfer tokens to the specified address
    const recipientAddress = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
    console.log(`Transferring tokens to ${recipientAddress}...`);
    const transferAmount = ethers.parseUnits("1", 18);
    const transferTx = await perc20.transfer(recipientAddress, transferAmount, {
      gasLimit: 2000000
    });
    const receipt = await transferTx.wait();
    console.log(`Transfer transaction hash: ${transferTx.hash}`);
    console.log(`Transaction mined in block number: ${receipt.blockNumber}`);
  } catch (error) {
    console.error("Transfer failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
