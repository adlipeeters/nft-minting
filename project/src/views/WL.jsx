import React from 'react'
import Banner from '../components/wl/Banner'
import Partners from '../components/wl/Partners'
import Joiners from '../components/wl/Joiners'
import { generateWL } from '../store'

const WL = () => {
    const whitelist = generateWL(10);
    return (
        <>
            <Banner />
            <Partners />
            <Joiners whitelist={whitelist} />
        </>
    )
}

export default WL