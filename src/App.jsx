import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth, auth } from "./firebase-config";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoutes from "./PrivateRoutes";
import Movies from "./pages/Movies";
import Boookmarks from "./pages/Boookmarks";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

export const UserContext = createContext();
function App() {

  // Get if user is logged in or not
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
    });
  }, []);
  
  console.log(currentUser);
  
  return (
    <div className="relative bg-background w-full min-h-screen text-primaryColor font-[Nunito]">
      <Header />
      {/* <SearchBar/> */}
      <UserContext.Provider value={{ currentUser }}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route index path="/" element={<Home />} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/series" element={<Series />} />
            <Route path="/bookmark" element={<Boookmarks />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
