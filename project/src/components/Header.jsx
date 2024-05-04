import { React, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { GoThreeBars } from 'react-icons/go'
import { AiOutlineClose } from 'react-icons/ai'
import ConnectWalletButton from './ConnectWalletButton'
import { useGlobalState } from '../store'

const pages = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        adminRequired: false
    },
    {
        name: 'Minting',
        path: '/minting',
        adminRequired: false
    },
    {
        name: 'Admin',
        path: '/admin',
        adminRequired: true
    },
]

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const [menu, setMenu] = useState(false);
    const location = useLocation()
    const [admin] = useGlobalState('admin')

    const desktopMenuItem = (page) => {
        if (page.adminRequired && !admin) {
            return null
        }
        return (
            <li key={page.name} className={classNames(
                location.pathname == page.path
                    ? 'border-white'
                    : 'border-transparent',
                `px-4 py-2 transition-all duration-150 border-b-2 hover:border-white`)}>

                <Link to={page.path}>{page.name}</Link>
            </li>
        )
    }

    const mobileMenuItem = (page) => {
        if (page.adminRequired && !admin) {
            return null
        }
        return (
            <li key={page.name} className={classNames(
                location.pathname == page.path
                    ? 'border-white'
                    : 'border-transparent',
                `px-4 py-2 transition-all duration-150 border-b-2 hover:border-white`)}>

                <Link to={page.path}>{page.name}</Link>
            </li>
        )
    }
    return (
        <div className='bg-[#521652] text-white font-semibold'>
            <div className='py-4 px-10 flex justify-between items-center'>
                <Link to='/' className='w-fit'>
                    <img src="" alt="Dapp Mint" className='w-14' />
                    {/* WL */}
                </Link>

                {location.pathname != '/' ? (
                    <>
                        <ul className='hidden md:flex justify-center space-x-6 md:w-2/5'>
                            {pages.map(page => (
                                desktopMenuItem(page)
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
                    {pages.map(page => (
                        mobileMenuItem(page)
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