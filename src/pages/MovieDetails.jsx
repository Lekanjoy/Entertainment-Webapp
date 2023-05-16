import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

const MovieDetails = () => {
  const [pleaseWork, setPleaseWork] = useState([]);
  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;

  const { searchResults, recommended, movies, trending } =
    useContext(UserContext);
  const getAllMoviesDetails = [
    ...searchResults,
    ...recommended,
    ...movies,
    ...trending,
  ];
  const { id } = useParams();
  // Find the movie or TV show that matches the ID
  const movieDetails = getAllMoviesDetails.find(
    (result) => result.id === parseInt(id)
  );

  const media_type = movieDetails?.media_type || "movie";
  const media_type_id = movieDetails?.id;
  const fetchDetails = `https://api.themoviedb.org/3/${media_type}/${media_type_id}?api_key=${API_KEY}&language=en-US`;

  console.log(id);
  // Fetching Details
  useEffect(() => {
    fetch(fetchDetails)
      .then((res) => res.json())
      .then((data) => {
        setPleaseWork(data.results);
      })
      .catch((err) => console.log(err));
  });

  return <div className="px-4 pt-20 ">{movieDetails?.overview}</div>;
};

export default MovieDetails;

