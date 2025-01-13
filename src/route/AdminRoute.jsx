import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;
  if (role === "admin") return children;
  return <Navigate to="/dashboard" replace="true"></Navigate>;
};

export default AdminRoute;
