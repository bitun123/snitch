
import { RouterProvider } from 'react-router-dom'
import { routes } from './App.Route'

import { useAuth } from '../feature/auth/hooks/useAuth'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

function App() {

  const { handleGetProfile } = useAuth();
const user = useSelector((state) => state.auth.user);
console.log("Current user:", user);
  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <RouterProvider router={routes} />

  )
}

export default App