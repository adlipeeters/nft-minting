import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className='flex justify-center items-center bg-[#6d1e6d] text-white py-5'>
            <div className='flex justify-center flex-col items-center text-center py-8 space-y-4 sm:w-2/3'>
                <h1 className='text-5xl'>Join the Whitelsit</h1>
                <p className='text-sm font-medium'>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <Link to='/dashboard' className='bg-white p-2 px-3 shadow-lg shadow-gray-800 transition-all duration-150 rounded-full hover:opacity-75'>
                    <p className='text-[#6d1e6d] text-sm font-medium'>
                        Launch App
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Banner