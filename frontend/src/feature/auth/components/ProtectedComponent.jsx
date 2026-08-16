import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedComponent({ children, role }) {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role doesn't match
  if (role && user.role !== role) {
    if (user.role === "seller") {
      return <Navigate to="/seller/dashboard" replace />;
    }

    if (user.role === "buyer") {
      return <Navigate to="/public/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedComponent;