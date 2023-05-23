import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./firebase-config";

export default function PrivateRoute() {
   const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center w-full h-screen animate-pulse">
        Getting your account ...
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
