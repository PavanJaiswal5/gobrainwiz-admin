// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
 const { user, isLoading } = useAuth();
const role = user?.role || "";
console.log("hii the role is ",role)
if (isLoading) return <div>Loading...</div>; 
console.log("hii the role is:",role)

if (!role || !allowedRoles.includes(role)) {
  return <Navigate to="/unauthorized" replace />;
}

  return children;
};

export default ProtectedRoute;
