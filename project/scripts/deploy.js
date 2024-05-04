const { ethers } = require('hardhat')
const fs = require('fs')

// async function main() {
//   const contract_name = ''
//   const Contract = await ethers.getContractFactory(contract_name)
//   const contract = await Contract.deploy()

//   await contract.deployed()

//   const address = JSON.stringify({ address: contract.address }, null, 4)
//   fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log('Deployed contract address', contract.address)
//   })
// }

// main()
//   .catch((error) => {
//     console.error(error)
//     process.exitCode = 1
//   })



async function main() {
  const maxSupply = 99;
  const baseURI = 'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/';
  const stageOneMax = 30;
  const stageTwoMax = 50;
  const airdropMax = 19;

  const Contract = await ethers.getContractFactory('DappMint');

  // for mainnet we need to specify the smart contract admin account
  [deployer] = await ethers.getSigners();
  const smartContractAdminAccount = deployer.address;
  const contract = await Contract.deploy(
    baseURI,
    maxSupply,
    stageOneMax,
    stageTwoMax,
    airdropMax,
    smartContractAdminAccount
  );

  await contract.deployed();

  const address = JSON.stringify({ address: contract.address }, null, 4)

  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })

}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })