import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Pay from './pages/pay'
import Setting from './pages/setting'
import Splash from './pages/splash'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Splash />
    },
    {
        path: '/home',
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