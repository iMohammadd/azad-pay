import { createBrowserRouter } from 'react-router-dom'
import About from './pages/about'
import Home from './pages/home'
import Pay from './pages/pay'

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
        path: '/about',
        element: <About />
    }
])

export default router