import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Series from "./components/pages/Series";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/series",
    element: <Series />,
  },
]);

function App() {
  return (
    <div className="bg-background w-full min-h-screen text-primaryColor font-[Nunito]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
