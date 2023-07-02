import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom/dist";

export default function ProtectedRoutes() {
  const { token } = useSelector((state) => state.UserReducer);

  return token ? <Outlet /> : <Navigate to={"/"} />;
}
