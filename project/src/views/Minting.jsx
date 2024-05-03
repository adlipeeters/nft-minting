import React from 'react'
import { generateNFTs, useGlobalState } from '../store'
import NFT from '../components/NFT'
import MintField from '../components/minting/MintField'

const Minting = () => {
  const [maximums] = useGlobalState('maximums')
  const [statuses] = useGlobalState('statuses')
  const myCollection = generateNFTs(7);
  return (
    <>
      <div className='h-[10vh] sm:h-[20vh] bg-[#6d1e6d]'></div>
      <div className='sm:flex sm:justify-between w-full space-y-4 sm:space-y-0 px-10 -mt-10'>
        {/* First card */}
        <div className='space-y-5 sm:w-[49.5%]'>
          <div className='bg-white rounded-md p-4 shadow-sm shadow-gray-300'>
            <h1 className='font-semibold'>Your minted NFTs</h1>
            <div className='h-[calc(100vh_-_35rem)] overflow-y-auto'>
              {myCollection.map((nft, i) => (
                <NFT key={i} nft={nft} symbol="DM" />
              ))
              }
            </div>
          </div>
        </div>
        {/* Second card */}
        <div className='space-y-5 sm:w-[49.5%]'>
          <MintField
            title="Stage One minting"
            stage={1}
            stageCount={maximums.stageOneCount}
            stageMax={maximums.stageOneMax}
            stopped={statuses.stageOnePaused}
          />
          <MintField
            title="Stage two minting"
            stage={2}
            stageCount={maximums.stageTwoCount}
            stageMax={maximums.stageTwoMax}
            stopped={statuses.stageTwoPaused}
          />
        </div>

      </div>
    </>
  )
}

export default Minting