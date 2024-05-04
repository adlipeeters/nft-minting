// const abi = require('../abis/src/contracts/DappMint.sol/DappMint.json');
// const address = require('../abis/contractAddress.json');
import abiFile from '../abis/src/contracts/DappMint.sol/DappMint.json';
import addressFile from '../abis/contractAddress.json';

import { ethers } from "ethers";
import { goerli, hardhat, mainnet } from 'wagmi/chains'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'

import { WagmiConfig, configureChains, createConfig, createClient } from 'wagmi'
import { EthereumClient } from 'wagmi'

const { ethereum } = window;
const ContractAddress = addressFile.address;
const ContractAbi = abiFile.abi;
// transaction
let tx

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

const chains = [hardhat, goerli, mainnet];
const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: process.env.REACT_APP_WALLET_CONNECT_ID }),
])

const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: 'web3Modal' }),
    provider: provider,
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

export { wagmiClient, ethereumClient }