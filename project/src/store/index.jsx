import { createGlobalState } from 'react-hooks-global-state';
import Withdrawal from '../components/admin/Withdrawal';

const { getGlobalState, useGlobalState, setGlobalState } = createGlobalState({
    chain: null,
    connectedAccount: '',
    withdrawModal: 'scale-0',
    airdropModal: 'scale-0',
    airdropListModal: 'scale-0',
    whiteList: [],
    myTotalCost: 13,
    airdrops: [],
    maximums: {
        stageOneMax: 0,
        stageTwoMax: 0,
        airdropMax: 0,
        maxSupply: 0,
        stageOneCount: 0,
        stageTwoCount: 0,
        airdropCount: 0,
        maxMintPerTime: 0,
    },
    revenues: 0,
    statuses: {
        stageOnePaused: true,
        stageTwoPaused: true,
        airdropped: 0,
    },
    prices: {
        stageOnePrice: 0,
        stageTwoPrice: 0,
    },
    admin: false
});

const generateWL = (numOfJoiners) => {
    const wls = [];

    for (let i = 1; i <= numOfJoiners; i++) {
        wls.push('0x' + Math.floor(Math.random() * 10 ** 40).toString(16));
    }
    return wls;
}

const generateNFTs = (numObjects) => {
    const nfts = []
    for (let i = 1; i < numObjects; i++) {
        const nft = {
            id: i,
            owner: '0x' + Math.floor(Math.random() * 10 ** 40).toString(16),
            baseURI:
                'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/',
            mintCost: Math.floor(Math.random() * 10) + 1,
            timestamp: Date.now(),
        }
        nfts.push(nft)
    }
    return nfts
}

const generateAirdropList = (numInList) => {
    const list = []
    for (let i = 1; i < numInList; i++) {
        const nft = {
            id: i,
            owner: '0x' + Math.floor(Math.random() * 10 ** 40).toString(16),
            tokens: i,
        }
        list.push(nft)
    }
    return list
}

const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
        let start = text.substring(0, startChars)
        let end = text.substring(text.length - endChars, text.length)
        while (start.length + end.length < maxLength) {
            start = start + '.'
        }
        return start + end
    }
    return text
}



export { getGlobalState, useGlobalState, setGlobalState, generateWL, truncate, generateNFTs, generateAirdropList };
