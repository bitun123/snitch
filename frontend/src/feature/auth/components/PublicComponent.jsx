import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PublicComponent({ children }) {
    const user = useSelector((state)=>state.auth.user)
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    const loading = useSelector((state)=>state.auth.loading)

    if (loading) {
        return <div>Loading...</div>;
    }

   if (isAuthenticated && user) {
    if(user.role === "seller"){
        return <Navigate to="/seller/dashboard" replace />;
    }
    if(user.role === "buyer"){
        return <Navigate to="/public/dashboard" replace />;
    }
}
  return (
    <div>
      {children}
    </div>
  )
}

export default PublicComponent
