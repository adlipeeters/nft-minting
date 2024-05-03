import React from 'react'
import { useGlobalState } from '../../store'

const MintingZone = () => {
    const [maximums] = useGlobalState('maximums')
    return (
        <div className='bg-white rounded-md p-4 shadow-sm shadow-gray-300 space-y-5 sm:w-[49.5%]'>
            <div className=''>
                <h1 className='font-semibold'>Minting powers</h1>
            </div>
            <div className='flex justify-between items-center border-t border-gray-100 py-2 gap-4'>
                {true ? (
                    <button
                        type="submit"
                        className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'>
                        Stage One
                    </button>
                ) : (
                    <button
                        type="submit"
                        className='bg-transparent border border-[#6d1e6d] text-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-sm font-medium'>
                        Stage One
                    </button>

                )
                }
                <span>
                    {maximums.stageOneCount} / {maximums.stageOneMax}
                </span>
            </div>
            <div className='flex justify-between items-center border-t border-gray-100 py-2 gap-4'>
                {true ? (
                    <button
                        type="submit"
                        className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'>
                        Stage Two
                    </button>
                ) : (
                    <button
                        type="submit"
                        className='bg-transparent border border-[#6d1e6d] text-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-sm font-medium'>
                        Stage Two
                    </button>
                )
                }
                <span>
                    {maximums.stageTwoCount} / {maximums.stageTwoMax}
                </span>
            </div>

        </div>
    )
}

export default MintingZone