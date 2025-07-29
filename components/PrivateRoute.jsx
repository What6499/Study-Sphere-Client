import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../src/Context/AuthContext/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
