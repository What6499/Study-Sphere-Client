import React from "react";
import useAuth from "../src/Context/AuthContext/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth;
  if (user) {
    return <Navigate to={"/auth"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
