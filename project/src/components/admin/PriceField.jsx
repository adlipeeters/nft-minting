import React from 'react'

const PriceField = ({ stage, currPrice }) => {
    const [price, setPrice] = React.useState('')

    const handleUpdate = async (e) => {
        e.preventDefault()
        await toast.promise(
            new Promise(async (resolve, reject) => {
                setTimeout(() => {
                    resolve('NFTs minted successfully')
                }, 3000)
            }),
            {
                pending: 'Minting NFTs...',
                success: 'NFTs minted successfully',
                error: 'Failed to mint NFTs'
            }
        )
    }
    return (
        <div className='flex justify-between items-center border-t border-gray-100 py-2 gap-4'>
            <form
                onSubmit={handleUpdate}
                className='flex flex-col sm:flex-row justify-between py-2 space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 w-full'>
                <input
                    type='number'
                    className='block flex-1 mb-4 sm:mb-0 sm:w-2/3 text-sm text-slate-500 bg-transparent border-gray-100 focus:outline-none focus:border-[#6d1e6d] focus:ring-0 rounded-lg'
                    min={1}
                    max={4}
                    maxLength={1}
                    name='price'
                    placeholder={`Current Pprice ${currPrice}`}
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button
                    type="submit"
                    className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'>
                    Update
                </button>
            </form>
        </div>
    )
}

export default PriceField