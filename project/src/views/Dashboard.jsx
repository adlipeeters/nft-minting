import React from 'react'
import { generateNFTs, useGlobalState } from '../store'
import NFT from '../components/NFT'

const Dashboard = () => {
  const [myTotalCost] = useGlobalState('myTotalCost')
  return (
    <>
      <div className='h-[10vh] sm:h-[20vh] bg-[#6d1e6d]'></div>
      {/* 1 */}
      <div>
        <div className='sm:flex sm:justify-between w-full space-y-4 sm:space-y-0 px-10 -mt-10'>
          {/* First card */}
          <div className='bg-white rounded-md p-4 space-y-5 sm:w-[49.5%] shadow-sm shadow-gray-300'>
            <h1 className='font-semibold text-4xl'>{4}</h1>
            <p className='font-light'>NFTs on your wallet</p>
          </div>
          {/* Second card */}
          <div className='bg-white rounded-md p-4 space-y-5 sm:w-[49.5%] shadow-sm shadow-gray-300'>
            <h1 className='font-semibold text-4xl'>{Number(myTotalCost).toFixed(2)}</h1>
            <p className='font-light'>Total NFTs Cost</p>
          </div>
        </div>
        {/* 2 */}
        <div className='sm:flex sm:justify-between w-full space-y-4 sm:space-y-0 px-10 mt-10'>
          {/* First card */}
          <div className='bg-white rounded-md p-4 space-y-5 sm:w-[49.5%] shadow-sm shadow-gray-300'>
            <h1 className='font-semibold'>Your minted NFTs</h1>
            <div className='h-[calc(100vh_-_35rem)] overflow-y-auto'>
              {generateNFTs(7).map((nft, i) => (
                <NFT key={i} nft={nft} symbol="DM"/>
              ))
              }
            </div>
          </div>
          {/* Second card */}
          <div className='bg-white rounded-md p-4 space-y-5 sm:w-[49.5%] shadow-sm shadow-gray-300'>
            <h1 className='font-semibold'>Recently NFTs</h1>
            <div className='h-[calc(100vh_-_35rem)] overflow-y-auto'>
              {generateNFTs(7).map((nft, i) => (
                <NFT key={i} nft={nft} symbol="DM"/>
              ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard