import React from 'react'
import { toast } from 'react-toastify'
import { performMinting } from '../../services/blockchain'

const MintField = ({ title, stage, stageCount, stageMax, stopped }) => {
    const [numOfMint, setNumOfMint] = React.useState('')

    const handleMint = async (e) => {
        e.preventDefault()
        console.log('Minting NFTs')
        if (stopped) {
            toast.warning(`${title} is inactive`);
            return
        }

        await toast.promise(
            new Promise(async (resolve, reject) => {
                await performMinting(numOfMint, stage)
                    .then(() => {
                        setNumOfMint('')
                        resolve()
                    })
                    .catch(() => reject())
            }),
            {
                pending: 'Minting NFTs...',
                success: 'NFTs minted successfully',
                error: 'Failed to mint NFTs'
            }
        )
    }

    return (
        <div className='bg-white rounded-md p-4 space-y-5 w-full shadow-sm shadow-gray-300'>
            <h1 className='font-semibold'>{title} ({stageCount} / {stageMax}) </h1>
            <form
                onSubmit={handleMint}
                className='flex flex-col sm:flex-row justify-between py-2 space-x-0 sm:space-x-2 space-y-2 sm:space-y-0'>
                <input
                    type='number'
                    className='block flex-1 mb-4 sm:mb-0 sm:w-2/3 text-sm text-slate-500 bg-transparent border-gray-100 focus:outline-none focus:border-[#6d1e6d] focus:ring-0 rounded-lg'
                    min={1}
                    max={4}
                    maxLength={1}
                    name='numOfmint'
                    placeholder='Number of mint (1 - 4)'
                    required
                    value={numOfMint}
                    onChange={(e) => setNumOfMint(e.target.value)}
                />
                <button
                    type="submit"
                    className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'>
                    Mint NFT
                </button>
            </form>
        </div>
    )
}

export default MintField