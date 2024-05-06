import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import WL from "./views/WL"
import Dashboard from "./views/Dashboard"
import Minting from "./views/Minting"
import Admin from "./views/Admin"
import { ToastContainer } from 'react-toastify'

import { useWalletInfo, useWeb3ModalEvents, useWeb3ModalState } from '@web3modal/wagmi/react'
import { setGlobalState, useGlobalState } from "./store"
import { useEffect } from "react"
import { useAccount } from "wagmi"
import { getData } from "./services/blockchain"
import PrivateAdminRoutes from "./utils/PrivateAdminRoutes"

const App = () => {
  const events = useWeb3ModalEvents()
  const { open, selectedNetworkId } = useWeb3ModalState();
  const { address, isConnecting, isDisconnected } = useAccount()
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [chain] = useGlobalState('chain')
  const [admin] = useGlobalState('admin')

  useEffect(() => {
    setGlobalState('chain', selectedNetworkId)

    if (connectedAccount && selectedNetworkId != chain) {
      window.location.reload()
    }

    // if (address) {
    if (connectedAccount != '' && address == null) {
      setGlobalState('connectedAccount', '')
      window.location.reload()
    }
    setGlobalState('connectedAccount', address ? address.toLowerCase() : '')

    const getBlockchainData = async () => {
      await getData();
    }
    getBlockchainData()
    //! load the blockchain data here ...
    // }
  }, [selectedNetworkId, address])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<WL />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minting" element={<Minting />} />
        <Route element={<PrivateAdminRoutes />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme={'dark'}
      />
    </div>
  )
}

export default App
