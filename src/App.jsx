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
import MovieDetails from "./pages/MovieDetails";

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

  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;
  const [searchResults, setSearchResults] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermMovies, setSearchTermMovies] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  // GET POPULAR MOVIES
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoadingMovies(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTermMovies]);

  // GET SEARCH RESULTS AND RECOMMENDED MOVIES AND TV SERIES BASED ON PREVIOUS SEARCH
  const language = "en-US";
  const page = 1;
  const includeAdult = false;

  useEffect(() => {
    const searchEndpoint = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${language}&query=${searchTerm}&page=${page}&include_adult=${includeAdult}`;
    fetch(searchEndpoint)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        setLoading(false);

        // Find the first movie or TV show that matches the query
        const matchingResults = searchResults.filter((result) => {
          const title = result.title || result.name;
          return (
            (result.media_type === "movie" || result.media_type === "tv") &&
            title.includes(searchTerm)
          );
        });

        console.log(matchingResults);
        // If no matching movie or TV show is found, log an error message and return
        if (matchingResults.length === 0) {
          console.error(
            `No matching movie or TV show found for query "${searchTerm}"`
          );
          return;
        }

        // Retrieve the recommendations for each matching movie or TV show
        const id = matchingResults[0].id;
        console.log(id);
        const recommendationEndpoint = `https://api.themoviedb.org/3/${matchingResults[0].media_type}/${id}/recommendations?api_key=${API_KEY}&language=${language}&page=${page}`;
        fetch(recommendationEndpoint)
          .then((response) => response.json())
          .then((data) => {
            setRecommended(data.results);
            setLoadingRecommended(false);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <div className="relative bg-background w-full min-h-screen text-primaryColor font-[Outfit]">
      <UserContext.Provider
        value={{
          currentUser,
          searchResults,
          searchTerm,
          setSearchTerm,
          recommended,
          loading,
          movies,
          setMovies,
          setLoadingMovies,
          loadingMovies,
          loadingRecommended,
          searchTermMovies,
          setSearchTermMovies,
        }}
      >
        <Header />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route index path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/bookmark" element={<Boookmarks />} />
            <Route path="/movies/movie/:id" element={<MovieDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
