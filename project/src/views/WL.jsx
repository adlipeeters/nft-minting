import React from 'react'
import Banner from '../components/wl/Banner'
import Partners from '../components/wl/Partners'
import Joiners from '../components/wl/Joiners'
import { generateWL, getGlobalState } from '../store'

const WL = () => {
    const whiteList = getGlobalState('whiteList');
    return (
        <>
            <Banner />
            <Partners />
            <Joiners whitelist={whiteList} />
        </>
    )
}

export default WL