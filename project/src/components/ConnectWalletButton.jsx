import React from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from "wagmi"
import { truncate } from '../store'

const ConnectWalletButton = () => {
    const { open } = useWeb3Modal()
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()

    const handleConnect = () => {
        open({ route: 'ConnectWallet' })
    }

    const handleConnectModal = () => {
        open({ route: 'Account' })
    }
    return (
        <>
            {isConnected ? (

                <button
                    onClick={handleConnectModal}
                    className='bg-white p-2 px-3 shadow-lg shadow-gray-800 transition-all duration-150 rounded-full hover:opacity-75'>
                    <p className='text-[#6d1e6d] text-sm font-medium'>{truncate(address, 4, 4, 11)}</p>
                </button>

            ) :
                (
                    <button
                        onClick={handleConnect}
                        className='bg-white p-2 px-3 shadow-lg shadow-gray-800 transition-all duration-150 rounded-full hover:opacity-75'>
                        <p className='text-[#6d1e6d] text-sm font-medium'>Connect Wallet</p>
                        {/* <p className='text-[#6d1e6d] text-sm font-medium'>Open Connect Modal</p> */}
                    </button>
                )
            }
        </>
    )
}

export default ConnectWalletButton



// import { useWeb3Modal } from '@web3modal/wagmi/react'

// export default function ConnectButton() {
//   // 4. Use modal hook
//   const { open } = useWeb3Modal()

//   return (
//     <>
//       <button onClick={() => open()}>Open Connect Modal</button>
//       <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
//     </>
//   )
// }