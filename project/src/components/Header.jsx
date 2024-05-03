import { React, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { GoThreeBars } from 'react-icons/go'
import { AiOutlineClose } from 'react-icons/ai'
import ConnectWalletButton from './ConnectWalletButton'

const pages = [
    {
        name: 'Dashboard',
        path: '/dashboard'
    },
    {
        name: 'Minting',
        path: '/minting'
    },
    {
        name: 'Admin',
        path: '/admin'
    },
]

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const [menu, setMenu] = useState(false);
    const location = useLocation()
    return (
        <div className='bg-[#521652] text-white font-semibold'>
            <div className='py-4 px-10 flex justify-between items-center'>
                <Link to='/' className='w-fit'>
                    <img src="" alt="Dapp Mint" className='w-14' />
                    {/* WL */}
                </Link>

                {location.pathname != '/' ? (
                    <>
                        <ul className='hidden md:flex justify-center md:w-2/5'>
                            {pages.map(page => (
                                <li key={page.name} className={classNames(
                                    location.pathname == page.path
                                        ? 'border-white'
                                        : 'border-transparent',
                                    `px-4 py-2 transition-all duration-150 border-b-2 hover:border-white`)}>
                                    <Link to={page.path}>{page.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : null}

                <button className='md:hidden' onClick={() => setMenu(!menu)}>
                    {menu
                        ? <AiOutlineClose size={35} />
                        : <GoThreeBars size={35} />
                    }
                </button>

                <div className='hidden md:flex gap-4 items-center'>
                    <ConnectWalletButton />
                </div>
            </div>

            {/* Mobile Menu */}
            {menu ? (
                <ul className='md:hidden py-4 px-10 flex flex-col space-y-3 font-semibold mt-4 shadow-md shadow-black bg-[#6d1e6d] text-white'>
                    {/* <li className='md:hidden'>
                    <button onClick={() => setMenu(!menu)} className='w-full py-2 px-10 text-left'>
                        Menu
                    </button>
                </li> */}
                    {pages.map(page => (
                        <li key={page.name} className={classNames(
                            location.pathname == page.path
                                ? 'border-white'
                                : 'border-transparent',
                            `px-4 py-2 transition-all duration-150 border-b-2 hover:border-white`)}>
                            <Link to={page.path}>{page.name}</Link>
                        </li>
                    ))}
                    <li>
                        <ConnectWalletButton />
                    </li>

                </ul>
            ) : ''}
        </div>
    )
}

export default Header