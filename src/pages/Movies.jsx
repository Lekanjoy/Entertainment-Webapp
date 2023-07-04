import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SkeletonLoaderMovies from "../components/SkeletonLoaderMovies";
import Movie from "../components/Movie";
import { UserContext } from "../App";

const Movies = () => {
  const {
    movies,
    setMovies,
    loadingMovies,
    setLoadingMovies,
    setSearchTermMovies,
    searchTermMovies,
  } = useContext(UserContext);
  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;


  // GET MOVIES SEARCH RESULTS
  useEffect(() => {
    if (searchTermMovies !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTermMovies}&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          setLoadingMovies(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchTermMovies]);

   useEffect(() => {
     document.title = "Popular Movies"; //Modify Func Later
   });

  
  return (
    <section className="px-4 pb-12 lg:pl-32">
      <SearchBar
        searchTerm={searchTermMovies}
        setSearchTerm={setSearchTermMovies}
        placeholder="Search for movies"
      />
      <div className="my-6 font-light text-xl tracking-[-0.3125px] flex gap-x-2 items-center ">
        <h1 className="text-xl">Popular</h1>
        <p className="border font-medium py-[1px] text-xs px-2 rounded-md">
          MOVIE
        </p>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Map through movies and show Skeleton Loader when loading  */}
        {loadingMovies
          ? [...Array(20)].map((_, i) => <SkeletonLoaderMovies key={i} />)
          : movies.map((movie) => (
              <Link key={movie.id} to={`/movies/movie/${movie.id}`}>
                <Movie movie={movie} />
              </Link>
            ))}
      </div>
    </section>
  );
};

export default Movies;
