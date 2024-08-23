// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
const {user}=useAuth()
const token =localStorage.getItem("token")
console.log(user)
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
