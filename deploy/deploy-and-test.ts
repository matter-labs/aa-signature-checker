import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { keccak256 } from "ethers/lib/utils";

async function deployChecker(deployer: Deployer): Promise<ethers.Contract> {
    const artifact = await deployer.loadArtifact("TestSignatureChecker");
    return await deployer.deploy(artifact, []);
}

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running deploy script for the Greeter contract`);

    // Initialize the wallet.
    const wallet = new Wallet(process.env.TEST_PK!);

    // Create deployer object and load the artifact of the contract we want to deploy.
    const deployer = new Deployer(hre, wallet);

    // Deposit some funds to L2 in order to be able to perform L2 transactions.
    const depositAmount = ethers.utils.parseEther("0.001");
    const depositHandle = await deployer.zkWallet.deposit({
        to: deployer.zkWallet.address,
        token: utils.ETH_ADDRESS,
        amount: depositAmount,
    });
    // Wait until the deposit is processed on zkSync
    await depositHandle.wait();

    const checker = await deployChecker(deployer);

    const msg = new Uint8Array([]);
    const msgHash = ethers.utils.hashMessage(msg);

    const signature = await wallet.signMessage(msg);

    if(!(await checker.isValidSignature(wallet.address, msgHash, signature))) {
        throw new Error('Failed to recognize a valid signature.');
    } else {
        console.log('Correctly verifies a correct signature.');
    }

    if(await checker.isValidSignature(wallet.address, msgHash, keccak256(signature))) {
        throw new Error('Recognized an invalid signature as valid one.');
    } else {
        console.log('Correctly verifies an incorrect signature.');
    }
}