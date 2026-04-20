import { createBrowserRouter } from 'react-router-dom'
import Login from '../feature/auth/page/Login'
import Register from '../feature/auth/page/Register'
import CreateProducts from '../feature/product/pages/CreateProducts'
import Dashboard from '../feature/product/pages/Dashboard'


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <h1>Hello, World!</h1>
    },
    {
        path: '/login',
        element: <Login />
    }, {
        path: '/register',
        element: <Register />
    },{
        path:'/seller',
        children:[
            {
                path:"/seller/create-product",
                element:<CreateProducts/>
            }   ,{
                path:"/dashboard",
                element:<Dashboard/>
            }
        ]
    }
])