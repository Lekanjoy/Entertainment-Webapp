import React, { useState, useEffect, useContext } from "react";
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
          console.log(err);
        });
    }
  }, [searchTermMovies]);

  
  return (
    <section className="px-4 pb-12">
      <SearchBar
        searchTerm={searchTermMovies}
        setSearchTerm={setSearchTermMovies}
        placeholder="Search for movies"
      />
      <h1 className="my-6 font-light text-xl tracking-[-0.3125px]">
        Popular Movies
      </h1>
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
