import React from "react";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Navigate } from "react-router-dom";
import Statistics from "../Admin/Statistics";

const Common = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "user") return <Navigate to="/dashboard/book-parcel" />;
  if (role === "deliveryman") return <Navigate to="/dashboard/mydelivery" />;
  return <div>{role === "admin" && <Statistics></Statistics>}</div>;
};

export default Common;
