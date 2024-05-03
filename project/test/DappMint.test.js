const { expect } = require('chai');
const { ethers } = require('hardhat');

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);
// const fromWei = (num) => ethers.utils.formatEther(num.toString());

const getBalance = async (walletAddress) => {
    return new Promise(async (resolve, reject) => {
        const provider = new ethers.providers.JsonRpcProvider(
            'http://localhost:8545'
        )
        await provider
            .getBalance(walletAddress)
            .then((balance) => resolve(balance))
            .catch((err) => reject(err))
    })
}

describe('Dapp Mint NFT', () => {
    let Contract, contract, result;

    const name = 'DappMint NFT';
    const symbol = 'DM';
    const maxSupply = 10;
    const baseURI = 'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/';
    const maxMintPerTime = 4;
    const stageOneMax = 4;
    const stageTwoMax = 6;
    const airdropMax = 5;
    const numOfMints = 1;
    const stageOneCost = toWei(0.02);
    const stageTwoCost = toWei(0.04);
    const newCost = toWei(0.1);
    const stageOne = 1;
    const stageTwo = 2;

    beforeEach(async () => {
        Contract = await ethers.getContractFactory('DappMint');
        // const [deployer, minter, minter2] = await ethers.getSigners();
        [deployer, minter, minter2] = await ethers.getSigners();

        contract = await Contract.deploy(
            baseURI,
            maxSupply,
            stageOneMax,
            stageTwoMax,
            airdropMax,
            deployer.address
        );

        await contract.deployed();
    })

    describe('Deployed', () => {
        it('Should confirm ERC721 info', async () => {
            const _name = await contract.name();
            const _symbol = await contract.symbol();
            expect(_name).to.be.equal(name);
            expect(_symbol).to.be.equal(symbol);
        });

        it('Should confirm deployer', async () => {
            const _deployer = await contract.owner();
            expect(_deployer).to.be.equal(deployer.address);
        })

        it('Should confirm BaseURI', async () => {
            const _baseURI = await contract.baseURI();
            expect(_baseURI).to.be.equal(baseURI);
        })

        it('Should confirm stage capacities', async () => {
            const _maxSupply = await contract.maxSupply();
            const _stageOneMax = await contract.stageOneMax();
            const _stageTwoMax = await contract.stageTwoMax();
            const _airdropMax = await contract.airdropMax();
            const _maxMintPerTime = await contract.maxMintPerTime();
            expect(_maxSupply).to.be.equal(maxSupply);
            expect(_stageOneMax).to.be.equal(stageOneMax);
            expect(_stageTwoMax).to.be.equal(stageTwoMax);
            expect(_airdropMax).to.be.equal(airdropMax);
            expect(_maxMintPerTime).to.be.equal(maxMintPerTime);
        })
    })
})