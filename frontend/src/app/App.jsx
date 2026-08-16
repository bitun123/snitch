
import { Navigate, RouterProvider } from 'react-router-dom'
import { routes } from './app.route'

import { useAuth } from '../feature/auth/hooks/useAuth'
import { useEffect } from 'react'

function App() {

  const { handleGetProfile } = useAuth();

  useEffect(() => {
    handleGetProfile();
  }, []);
  return (
    <RouterProvider router={routes} />
  )
}

export default App