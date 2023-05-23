import React, { useEffect, useState, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./App";

export default function PrivateRoute() {
  const { currentUser, isLoadingUser } = useContext(UserContext);

  if (isLoadingUser) {
    return (
      <div className=" flex justify-center items-center w-full h-screen animate-pulse">
        Getting your account ...
      </div>
    );
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
