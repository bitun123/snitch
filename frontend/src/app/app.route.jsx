import { createBrowserRouter } from 'react-router-dom'
import Login from '../feature/auth/page/Login'
import Register from '../feature/auth/page/Register'
import CreateProducts from '../feature/product/pages/CreateProducts'
import Dashboard from '../feature/product/pages/Dashboard'
import ProtectedComponent from '../feature/auth/components/ProtectedComponent'
import Home from '../feature/product/pages/Home'
import ProductDetails from '../feature/product/pages/ProductDetails'
import SellerProductDetails from '../feature/product/pages/SellerProductDetails'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/product/:productId',
        element: <ProductDetails />,
    },
    {
        path: '/seller',
        children: [
            {
                path: '/seller/create-product',
                element: (
                    <ProtectedComponent role="seller">
                        <CreateProducts />
                    </ProtectedComponent>
                ),
            },
            {
                path: '/seller/dashboard',
                element:<ProtectedComponent role="seller">
                    <Dashboard />
                </ProtectedComponent>,
            },
            {
                path: '/seller/product/:productId',
                element:<ProtectedComponent role="seller">
                    <SellerProductDetails />
                </ProtectedComponent>,
            }
        ],
    },
])