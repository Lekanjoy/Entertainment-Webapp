import React, { useEffect, useState } from "react";
import SkeletonLoaderMovies from "./SkeletonLoaderMovies";
import Movie from "./Movie";

const Recommended = () => {
  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);

  //   GET RECOMMENDED MOVIES BASED ON PREVIOUS SEARCH
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/550/recommendations?api_key=${API_KEY}&language=en-US&page=2`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecommended(data.results);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Map through movies and show Skeleton Loader when loading  */}
      {loading
        ? [...Array(20)].map((_, i) => <SkeletonLoaderMovies key={i} />)
        : recommended.map((movie) => <Movie key={movie.id} movie={movie} />)}
    </div>
  );
};

export default Recommended;
