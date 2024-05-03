import React from 'react'
import { generateNFTs, useGlobalState } from '../store'
import NFT from '../components/NFT'
import MintField from '../components/minting/MintField'
import MintingZone from '../components/admin/MintingZone'
import RewardZone from '../components/admin/RewardZone'
import AirdropZone from '../components/admin/AirdropZone'
import PriceZone from '../components/admin/PriceZone'
import Withdrawal from '../components/admin/Withdrawal'
import Airdrop from '../components/admin/Airdrop'
import AirdropList from '../components/admin/AirdropList'

const Admin = () => {
  const [maximums] = useGlobalState('maximums')
  const [statuses] = useGlobalState('statuses')
  const myCollection = generateNFTs(7);
  return (
    <>
      <div className='h-[10vh] sm:h-[20vh] bg-[#6d1e6d]'></div>
      <div>
        <div className='sm:flex sm:justify-between w-full space-y-4 sm:space-y-0 px-10 -mt-10'>
          <MintingZone />
          <RewardZone />
        </div>
        <div className='sm:flex sm:justify-between w-full space-y-4 sm:space-y-0 px-10 mt-10'>
          <AirdropZone />
          <PriceZone />
        </div>
      </div>
      <Withdrawal />
      <Airdrop />
      <AirdropList />
    </>
  )
}

export default Admin