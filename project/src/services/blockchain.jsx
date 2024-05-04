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

const getAdmin = async () => {
    try {
        if (!ethereum) return alert('Please install metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const contract = await getEthereumContract();

        const admin = await contract.owner();
        // console.log(admin)
        setGlobalState('admin', connectedAccount == admin.toLowerCase());
    } catch (error) {
        reportErrors(error)
    }
}

const getData = async () => {
    await getAdmin();
}

const reportErrors = (error) => {
    console.log(error)
    throw new Error('No ethereum object')
}

export { getData }

export function Web3ModalProvider({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}