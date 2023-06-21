import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom/dist";

export default function AutoNavigateRoutes() {
  const { token } = useSelector((state) => state.UserReducer);
  console.log(token);

  // useEffect(() => {
  //   refreshToken();
  // }, []);

  return token ? <Navigate to={"/"} /> : <Outlet />;
}
