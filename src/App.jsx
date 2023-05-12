import { useState, createContext } from "react";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoutes from "./PrivateRoutes";

export const UserContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  return (
    <div className="bg-background w-full min-h-screen text-primaryColor font-[Nunito]">
      <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route index path="/" element={<Home />} />
            <Route path="/series" element={<Series />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
