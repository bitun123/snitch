import { createBrowserRouter } from 'react-router-dom'
import Login from '../feature/auth/page/Login'
import Register from '../feature/auth/page/Register'


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
    }
])