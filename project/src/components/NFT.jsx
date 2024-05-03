import React from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import {truncate} from '../store'

const NFT = ({ nft, symbol }) => {
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        }
        return date.toLocaleString('en-US', options)
    }
    return (
        <div className='border-t border-gray-100 py-2 px-6 flex items-center gap-4'>
            <img
                src={nft.baseURI + nft.id + '.webp'}
                alt={'DM #' + nft.id}
                className='w-10 h-10 object-cover rounded-full'
            />
            <div className='flex justify-between items-center space-x-2 w-full'>
                <div>
                    <p className='text-sm'>{symbol + '#' + nft.id}</p>
                    <span className='text-xs text-gray-500'>{formatTimestamp(nft.timestamp)}</span>
                </div>
                <a
                    href={`https://testnets.opensea.io/assets/CHAIN/ADDRESS/` + nft.id}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='flex items-center justify-start space-x-2 text-xs font-semibold text-gray-500'>
                    <span>{truncate(nft.owner, 4, 4, 11)}</span>
                    <BiLinkExternal />
                </a>
            </div>
        </div>
    )
}

export default NFT