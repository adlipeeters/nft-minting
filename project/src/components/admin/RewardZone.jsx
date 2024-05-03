import React from 'react'
import { setGlobalState, useGlobalState } from '../../store'

const RewardZone = () => {
    const [withdrawModal] = useGlobalState('withdrawModal')
    const [revenues] = useGlobalState('revenues')
    return (
        <div className='bg-white rounded-md p-4 shadow-sm shadow-gray-300 space-y-5 sm:w-[49.5%]'>
            <div className=''>
                <h1 className='font-semibold'>Reward powers</h1>
            </div>
            <div className='flex justify-between items-center border-t border-gray-100 py-2 gap-4'>
                <button
                    onClick={() => setGlobalState('withdrawModal', 'scale-100')}
                    type="button"
                    className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'>
                    Withdraw
                </button>
                <div>
                    <span className='font-bold'>{revenues} ETH</span> (Available)
                </div>
            </div>


        </div>
    )
}

export default RewardZone