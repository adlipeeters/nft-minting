import React from 'react'
import { setGlobalState, useGlobalState } from '../../store'

const AirdropZone = () => {
    const [maximums] = useGlobalState('maximums')
    const [airdrops] = useGlobalState('airdrops')
    return (
        <div className='bg-white rounded-md p-4 shadow-sm shadow-gray-300 space-y-5 sm:w-[49.5%]'>
            <div className=''>
                <h1 className='font-semibold'>Airdrop Powers</h1>
            </div>
            <div className='flex justify-between items-center border-t border-gray-100 py-2 gap-4'>

                <button
                    type="submit"
                    className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'
                    onClick={() => setGlobalState('airdropModal', 'scale-100')}
                >
                    Perform Airdrop
                </button>

                <span>
                    {maximums.airdropCount} / {maximums.airdropMax}
                </span>
            </div>
            <div className='flex justify-between items-center border-t border-gray-100 py-2 gap-4'>
                <button
                    type="submit"
                    className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'
                    onClick={() => setGlobalState('airdropListModal', 'scale-100')}
                >
                    List Airdrop
                </button>
                <span>
                    {airdrops.length}
                </span>
            </div>
        </div>
    )
}

export default AirdropZone