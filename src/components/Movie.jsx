import React from "react";
import img from "../assets/trending-assets/trendingImg.svg";
import bookmarkIcon from "../assets/trending-assets/bookmarkIcon.svg";
import movieIcon from "../assets/trending-assets/movieIcon.svg";
import tvIcon from "../assets/trending-assets/series.svg";
import playIcon from "../assets/playIcon.svg";

const Movie = ({ movie }) => {
  const release_date = movie.release_date || movie.first_air_date;

  return (
    <div className="movieContainer relative w-full ">
      <img
        src={
          movie.poster_path || movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w200${
                movie.backdrop_path || movie.poster_path
              }`
            : img
        }
        alt={movie.title || movie.original_title || movie.original_name}
        className="mb-2 w-full rounded-lg h-[130px] "
      />
      <img
        src={bookmarkIcon}
        alt="Bookmark Icon"
        className="absolute top-2 right-2 cursor-pointer"
      />
      <img
        src={playIcon}
        alt="Play Icon"
        className="playIcon absolute  w-24 h-24 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%] cursor-pointer lg:translate-x-[-50%] lg:translate-y-[-70%]"
      />
      <div className="flex flex-col  bottom-4 left-4 z-10">
        <div className="flex gap-x-4 font-light text-xs">
          <p>{release_date?.slice(0, 4) || "N/A"}</p>
          <div className="flex gap-x-1">
            <div className="flex gap-x-2">
              <p className="opacity-50">•</p>
              <img
                src={movie.media_type === "movie" ? movieIcon : tvIcon}
                alt="Media Icon"
              />
            </div>
            <p>{movie.media_type ? movie.media_type : "Movie"}</p>
          </div>
        </div>
        <h2 className="text-[14px] font-medium mt-1">
          {movie.title ? movie.title : movie.original_name}
        </h2>
      </div>
    </div>
  );
};

export default Movie;
