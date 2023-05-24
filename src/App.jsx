import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Movies from "./pages/Movies";
import Boookmarks from "./pages/Boookmarks";
import Header from "./components/Header";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import Error404 from "./pages/Error404";

export const UserContext = createContext();
function App() {
  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [recommended, setRecommended] = useState([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  const [movies, setMovies] = useState([]);
  const [searchTermMovies, setSearchTermMovies] = useState("");
  const [loadingMovies, setLoadingMovies] = useState(true);

  const [series, setSeries] = useState([]);
  const [searchTermSeries, setSearchTermSeries] = useState("");
  const [loadingSeries, setLoadingSeries] = useState(true);

  const [trending, setTrending] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  // GET TRENDING MOVIES AND TV SERIES
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setTrending(data.results);
        setLoadingTrending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  // GET POPULAR TV SERIES
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSeries(data.results);
        setLoadingSeries(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTermSeries]);

  // GET SEARCH RESULTS AND RECOMMENDED MOVIES/TV SERIES BASED ON PREVIOUS SEARCH
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
          const title = result.title || result.name || result.original_title;
          return (
            (result.media_type === "movie" || result.media_type === "tv") &&
            title.includes(searchTerm)
          );
        });

        // Retrieve the recommendations for each matching movie or TV show
        const id = matchingResults[0].id;
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
    <div className="relative bg-background w-full min-h-screen text-primaryColor pb-8 font-[Outfit]">
      <ErrorBoundary>
        <UserContext.Provider
          value={{
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
            trending,
            loadingTrending,
            series,
            setSeries,
            setSearchTermSeries,
            loadingSeries,
            searchTermSeries,
          }}
        >
          <Header />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route index path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/bookmark" element={<Boookmarks />} />
              <Route path="/movies/movie/:id" element={<MovieDetails />} />
              <Route path="/trending/:id" element={<MovieDetails />} />
              <Route path="/series/tv/:id" element={<MovieDetails />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error404/>} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
