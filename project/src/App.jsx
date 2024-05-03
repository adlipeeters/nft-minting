import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import WL from "./views/WL"
import Dashboard from "./views/Dashboard"
import Minting from "./views/Minting"
import Admin from "./views/Admin"
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<WL />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minting" element={<Minting />} />
        <Route path="/admin" element={<Admin />} />
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
