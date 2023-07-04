import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

const MovieDetails = () => {
  const [fullMovieDetail, setFullMovieDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;

  const { searchResults, recommended, movies, series, trending } =
    useContext(UserContext);
  const getAllMoviesDetails = [
    ...searchResults,
    ...recommended,
    ...movies,
    ...series,
    ...trending,
  ];

  // Find the movie or TV show that matches the ID
  const { id } = useParams();
  const findMovieDetails = getAllMoviesDetails.find(
    (result) => result.id === parseInt(id)
  );

  // Check if media type is movie or tv
  const [movieOrTv] = useState(
    findMovieDetails?.release_date
      ? "movie"
      : findMovieDetails?.first_air_date
      ? "tv"
      : "person"
  );
  const media_type_id = findMovieDetails?.id;
  const fetchDetails = `https://api.themoviedb.org/3/${movieOrTv}/${media_type_id}?api_key=${API_KEY}&language=en-US`;

  // Fetching Details
  useEffect(() => {
    fetch(fetchDetails)
      .then((res) => res.json())
      .then((data) => {
        setFullMovieDetail(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [fetchDetails]);

  // Fetching Cast
  const fetchCast = `https://api.themoviedb.org/3/${movieOrTv}/${media_type_id}/credits?api_key=${API_KEY}&language=en-US`;
  const [cast, setCast] = useState([]);
  useEffect(() => {
    fetch(fetchCast)
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast);
      })
      .catch((err) => console.log(err));
  }, [fetchCast]);

  // Slice to show only year
  const releaseYear =
    fullMovieDetail.release_date?.slice(0, 4) ||
    fullMovieDetail.first_air_date?.slice(0, 4);
  // Get Main Spoken Language
  const spokenLanguage =
    fullMovieDetail.spoken_languages?.[0].english_name ||
    fullMovieDetail.spoken_languages?.[0].name;
  // Get TV and Movie Runtime
  const runtime = fullMovieDetail.episode_run_time || fullMovieDetail.runtime;

  // Get Rating and use it to show stars
  const rating = fullMovieDetail.vote_average;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating / 2) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primaryColor fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 1.667l2.598 5.295 5.802.842-4.19 4.084.988 5.748L10 14.176l-5.198 2.46.988-5.748-4.19-4.084 5.802-.842L10 1.667zm0 2.5l-3.333 6.667h6.666L10 4.167z"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400 fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 1.667l2.598 5.295 5.802.842-4.19 4.084.988 5.748L10 14.176l-5.198 2.46.988-5.748-4.19-4.084 5.802-.842L10 1.667zm0 2.5l-3.333 6.667h6.666L10 4.167z"
          />
        </svg>
      );
    }
  }

  useEffect(() => {
    document.title = fullMovieDetail?.title;  //Modify Func Later
  });

  return (
    <section className="px-4 pt-20 w-full lg:pl-32 lg:pr-8 lg:flex">
      <div className="w-full flex justify-center lg:justify-start ">
        {loading ? (
          <div className="w-4/5  h-[500px] object-cover rounded-xl bg-gray-400 animate-pulse"></div>
        ) : (
          <div className="w-[80%] overflow-hidden h-[500px]">
            <img
              src={`https://image.tmdb.org/t/p/original/${fullMovieDetail.poster_path}`}
              alt={fullMovieDetail.title}
              className="block m-auto max-w-full  max-h-full rounded-xl lg:min-w-full lg:object-contain"
            />
          </div>
        )}
      </div>
      <div className="lg:">
        <div className="w-full flex flex-col justify-center items-center text-center pb-4 lg:items-start lg:justify-start">
          <h1 className="text-2xl font-light mt-4 lg:text-4xl lg:font-medium lg:mt-0">
            {fullMovieDetail.title || fullMovieDetail.name}
          </h1>
          <p className="font-light text-sm text-[#86888d] lg:text-base">
            {fullMovieDetail.tagline}
          </p>
        </div>
        <div className="w-full flex flex-col justify-center gap-y-2 items-center pb-4 lg:gap-x-3 lg:justify-start lg:flex-row">
          <p className="text-3xl font-bold">
            {(fullMovieDetail.vote_average / 2).toFixed(1) || "N/A"}
          </p>
          <div className="flex gap-x-1">{stars}</div>
        </div>
        <div className="w-full flex  justify-between  gap-x-2 py-4 lg:justify-start lg:gap-x-8">
          <div>
            <p className=" text-[#86888d]">Language</p>
            <p className="text-sm">{spokenLanguage}</p>
          </div>
          <div>
            <p className=" text-[#86888d]">
              {movieOrTv === "tv" ? "First Air" : "Length"}
            </p>
            <p className="text-sm">
              {movieOrTv === "tv"
                ? fullMovieDetail.first_air_date
                : runtime + `mins.`}
            </p>
          </div>
          <div>
            <p className=" text-[#86888d]">
              {movieOrTv === "tv" ? "Last Air" : "Year"}
            </p>
            <p className="text-sm">
              {movieOrTv === "tv" ? fullMovieDetail.last_air_date : releaseYear}
            </p>
          </div>
          <div>
            <p className=" text-[#86888d]">Status</p>
            <p className="text-sm">{fullMovieDetail.status}</p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="mb-2">Genres</h2>
          <div className="flex gap-x-2 ">
            {fullMovieDetail?.genres?.map((genre, id) => (
              <p
                key={id}
                className="text-xs  text-darkBlue bg-primaryColor px-2 rounded lg:text-sm lg:px-3 lg:py-1"
              >
                {genre.name}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3">Synopsis</h2>
          <p className=" font-light">{fullMovieDetail.overview}</p>
        </div>
        <div className="mt-8 w-full">
          <h2 className="mb-3">Cast</h2>
          <div className="flex gap-2 flex-wrap w-full">
            {cast?.map((actor) => {
              return (
                <p key={actor.name} className="text-sm border px-2 rounded">
                  {actor.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
