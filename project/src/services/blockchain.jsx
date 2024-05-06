// const abi = require('../abis/src/contracts/DappMint.sol/DappMint.json');
// const address = require('../abis/contractAddress.json');
import abiFile from '../abis/src/contracts/DappMint.sol/DappMint.json';
import addressFile from '../abis/contractAddress.json';

import { ethers } from "ethers";
import { goerli, hardhat, mainnet } from 'wagmi/chains'


import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getGlobalState, setGlobalState } from '../store';

const { ethereum } = window;
const ContractAddress = addressFile.address;
const ContractAbi = abiFile.abi;
// transaction
let tx

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);


// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_WALLET_CONNECT_ID

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [hardhat, goerli, mainnet];
// const chains = [hardhat];
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    // ...wagmiOptions // Optional - Override createConfig parameters
})

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true,// Optional - false as default
    themeMode: 'light'
})

const getEthereumContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    return contract;
}

const switchMinting = async (state, stage) => {
    try {
        if (!ethereum) return alert('Please install metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const contract = await getEthereumContract();
        const tx = await contract.pause(state, stage,
            // {
            //     from: connectedAccount
            // }
        );
        await tx.wait();
        await getData();
    } catch (error) {
        reportErrors(error)
    }
}

const performMinting = async (numOfMints, stage) => {
    try {
        if (!ethereum) return alert('Please install metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const prices = getGlobalState('prices');
        const contract = await getEthereumContract();

        const price = stage == 1 ? prices.stageOnePrice : prices.stageTwoPrice;

        const tx = await contract.mintNFT(numOfMints, stage, {
            from: connectedAccount,
            value: toWei(price * numOfMints)
        });
        await tx.wait();
        await getData();
    } catch (error) {
        reportErrors(error)
    }
}

const changePrice = async (newCost, stage) => {
    try {
        if (!ethereum) return alert('Please install metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const contract = await getEthereumContract();

        const tx = await contract.setCost(toWei(newCost).toString(), stage, {
            from: connectedAccount,
        });
        await tx.wait();
        await getData();
    } catch (error) {
        reportErrors(error)
    }
}

const splitRevenue = async (beneficiaries, percentages, amount) => {
    try {
        if (!ethereum) return alert('Please install metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const contract = await getEthereumContract();

        const tx = await contract.withdrawTo(beneficiaries, percentages, toWei(amount), {
            from: connectedAccount,
        });
        await tx.wait();
        await getData();
    } catch (error) {
        reportErrors(error)
    }
}

const performAirdrop = async (beneficiaries, tokens) => {
    try {
        if (!ethereum) return alert('Please install metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const contract = await getEthereumContract();

        const tx = await contract.airDropTo(beneficiaries, tokens, {
            from: connectedAccount,
        });
        await tx.wait();
        await getData();
    } catch (error) {
        reportErrors(error)
    }
}

const joinWL = async () => {
    try {
        if (!ethereum) return alert('Please install metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const contract = await getEthereumContract();

        const tx = await contract.joinWhitelist({
            from: connectedAccount,
        });
        await tx.wait();
        // await getData();
        await getWL();
    } catch (error) {
        reportErrors(error)
    }
}

const getAdmin = async () => {
    try {
        if (!ethereum) return alert('Please install metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const contract = await getEthereumContract();

        const admin = await contract.owner();
        const stageOnePaused = await contract.stageOnePaused();
        const stageTwoPaused = await contract.stageTwoPaused();
        const airdroppers = await contract.getAirdroppers();
        // * Set global state
        setGlobalState('admin', connectedAccount == admin.toLowerCase());
        setGlobalState('statuses', { stageOnePaused, stageTwoPaused });
        setGlobalState('airdrops', structuredAirdrops(airdroppers));
    } catch (error) {
        reportErrors(error)
    }
}

const getWL = async () => {
    if (!ethereum) return alert('Please install metamask');
    const contract = await getEthereumContract();
    const whitelist = await contract.getWhitelist();
    if (!Array.isArray(whitelist) || !whitelist || whitelist == 'undefined') {
        whitelist = [];
    }
    setGlobalState('whiteList', structureWL(whitelist));
}

const getStats = async () => {
    if (!ethereum) return alert('Please install metamask');
    const contract = await getEthereumContract();
    const stageOneMax = await contract.stageOneMax();
    const stageTwoMax = await contract.stageTwoMax();
    const airdropMax = await contract.airdropMax();
    const maxSupply = await contract.maxSupply();
    const maxMintPerTime = await contract.maxMintPerTime();

    const stageOneCount = await contract.stageOneCount();
    const stageTwoCount = await contract.stageTwoCount();
    const airdropCount = await contract.airdropCount();

    const stageOneCost = await contract.stageOneCost();
    const stageTwoCost = await contract.stageTwoCost();

    const netRevenue = await contract.netRevenue();

    setGlobalState('maximums', {
        stageOneMax: Number(stageOneMax),
        stageTwoMax: Number(stageTwoMax),
        airdropMax: Number(airdropMax),
        maxSupply: Number(maxSupply),
        maxMintPerTime: Number(maxMintPerTime),
        stageOneCount: Number(stageOneCount),
        stageTwoCount: Number(stageTwoCount),
        airdropCount: Number(airdropCount),
    });

    setGlobalState('prices', {
        stageOnePrice: fromWei(stageOneCost),
        stageTwoPrice: fromWei(stageTwoCost),
    });

    setGlobalState('revenues', fromWei(netRevenue));
}

const getRecentNFTs = async () => {
    if (!ethereum) return alert('Please install metamask');
    const contract = await getEthereumContract();
    const nfts = await contract.getMintedNFTs();
    setGlobalState('collections', structuredNFTs(nfts));
}

const getMyNFTs = async () => {
    if (!ethereum) return alert('Please install metamask');
    const contract = await getEthereumContract();
    const connectedAccount = getGlobalState('connectedAccount');

    const myTotalCost = await contract.totalCost(connectedAccount);
    const nfts = await contract.getOwnerNFTs(connectedAccount);

    setGlobalState('myTotalCost', fromWei(myTotalCost));
    setGlobalState('myCollection', structuredNFTs(nfts));

}

const getData = async () => {
    await getWL();
    await getAdmin();
    await getStats();
    await getRecentNFTs();
    await getMyNFTs();
}

const structuredNFTs = (nfts) => {
    return nfts.map((nft) => {
        return {
            id: nft.id.toNumber(),
            owner: nft.owner.toLowerCase(),
            baseURI: nft.baseURI,
            mintCost: fromWei(nft.mintCost),
            timestamp: Number(nft.timestamp + '000'),
        }
    }).reverse();
}

const structuredAirdrops = (airdrops) => {
    return airdrops.map((airdrop) => {
        return {
            tokens: airdrop.tokens.toNumber(),
            beneficiary: airdrop.beneficiary.toLowerCase(),
        }
    }).reverse();
}

const structureWL = (wls) => {
    return wls.map((wl) => wl.toLowerCase()).reverse();
}

const reportErrors = (error) => {
    console.log(error)
    throw new Error('No ethereum object')
}

export { ContractAddress as address, getData, switchMinting, performMinting, changePrice, splitRevenue, performAirdrop, joinWL }

export function Web3ModalProvider({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}