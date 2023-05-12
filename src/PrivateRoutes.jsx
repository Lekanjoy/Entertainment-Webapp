import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import {useAuth } from "./firebase-config";
import { UserContext } from "./App";

const PrivateRoutes = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  // Get if user is logged in
  const user = useAuth();

  return user?.uid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
