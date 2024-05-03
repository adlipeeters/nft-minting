import React from 'react'
import { useGlobalState } from '../../store'
import PriceField from './PriceField'

const PriceZone = () => {
    const [maximums] = useGlobalState('maximums')
    const [airdrops] = useGlobalState('airdrops')
    const [prices] = useGlobalState('prices')
    return (
        <div className='bg-white rounded-md p-4 shadow-sm shadow-gray-300 space-y-5 sm:w-[49.5%]'>
            <div className=''>
                <h1 className='font-semibold'>Price Powers</h1>
            </div>
            <PriceField
                currPrice={prices?.stageOnePrice}
                stage={1} />
            <PriceField
                currPrice={prices?.stageTwoPrice}
                stage={2} />
        </div>
    )
}

export default PriceZone