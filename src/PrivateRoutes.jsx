import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./App";

const PrivateRoutes = () => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  return loading ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoutes;
