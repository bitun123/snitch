import { createBrowserRouter } from 'react-router-dom'
import Login from '../feature/auth/page/Login'
import Register from '../feature/auth/page/Register'
import CreateProducts from '../feature/product/pages/CreateProducts'
import Dashboard from '../feature/product/pages/Dashboard'
import ProtectedComponent from '../feature/auth/components/ProtectedComponent'


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedComponent>
            <h1>Hello, World!</h1>
        </ProtectedComponent>
    },
    {
        path: '/login',
        element: <Login />
    }, {
        path: '/register',
        element: <Register />
    },

    {
        path: '/seller',
        children: [
            {
                path: "/seller/create-product",
                element: <CreateProducts />
            }, {
                path: "/seller/dashboard",
                element: <Dashboard />
            }
        ]
    }
])