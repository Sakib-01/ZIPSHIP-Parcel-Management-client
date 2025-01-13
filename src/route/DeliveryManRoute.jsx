import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";

const DeliveryManRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;
  if (role === "deliveryman") return children;
  return <Navigate to="/dashboard" replace="true"></Navigate>;
};

export default DeliveryManRoute;
