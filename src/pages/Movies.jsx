import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import SearchBar from "../components/SearchBar";

const Movies = () => {
  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchTerm]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  return (
    <section className="px-4 pb-12">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search for movies"
      />
      <h1 className="mt-6 mb-6 font-light text-xl tracking-[-0.3125px]">
        Popular Movies
      </h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </div>
    </section>
  );
};

export default Movies;
