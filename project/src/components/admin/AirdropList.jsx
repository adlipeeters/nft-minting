import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { setGlobalState, truncate, useGlobalState, generateAirdropList } from '../../store'
import { toast } from 'react-toastify'

const AirdropList = () => {
    const [airdropListModal] = useGlobalState('airdropListModal')
    const [airdrops] = useGlobalState('airdrops')
    // const airdroppers = generateAirdropList(15)

    const onClose = () => {
        setGlobalState('airdropListModal', 'scale-0')
    }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${airdropListModal}`}>
            <div className='bg-white shadow-xl shadow-[#c963c9] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold'>Airdrop List</p>
                        <button
                            onClick={onClose}
                            type='button'
                            className='border-0 bg-transparent focus:outline-none'>
                            <FaTimes />
                        </button>
                    </div>
                    <div className='max-h-[400px] overflow-y-auto'>
                        {airdrops.map((airdropper, i) => (
                            <div
                                key={i}
                                className='flex justify-between items-center mt-5'>
                                <div className='flex justify-start items-center space-x-2'>
                                    <Identicon
                                        string={airdropper.beneficiary}
                                        size={25}
                                        className="bg-white rounded-full shadow-md"
                                    />
                                    <span className='text-xs font-medium'>{truncate(airdropper.beneficiary, 4, 4, 11)}</span>
                                </div>

                                <div className='rounded-full text-gray-500 bg-gray-200 font-semibold p-1.5 px-3 text-xs'>
                                    <span>{airdropper.tokens}</span>
                                </div>

                            </div>
                        ))}
                    </div>
                    {/* <div className='flex justify-start items-center rounded-xl mt-5 space-x-2'>
                        
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default AirdropList