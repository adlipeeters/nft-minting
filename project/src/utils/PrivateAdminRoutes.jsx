import { Navigate, Outlet } from 'react-router-dom'
import { useGlobalState } from '../store'

const PrivateAdminRoutes = () => {
    const [admin] = useGlobalState('admin')
    return !admin ? <Navigate to='/' /> : <Outlet />
}

export default PrivateAdminRoutes