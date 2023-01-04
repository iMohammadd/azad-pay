import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Pay from './pages/pay'
import Setting from './pages/setting'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/pay',
        element: <Pay />
    },
    {
        path: '/setting',
        element: <Setting />
    }
])

export default router