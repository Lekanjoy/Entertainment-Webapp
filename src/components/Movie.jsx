import React from "react";
import img from "../assets/trending-assets/trendingImg.svg";
import bookmarkIcon from "../assets/trending-assets/bookmarkIcon.svg";
import movieIcon from "../assets/trending-assets/movieIcon.svg";

const Movie = ({ movie }) => {
  const release_date = movie.release_date;

  return (
    <div className="relative w-full">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : img
        }
        alt={movie.title || movie.name}
        className="mb-2 w-full rounded-lg max-h-[110px] "
      />
      <img
        src={bookmarkIcon}
        alt="Bookmark Icon"
        className="absolute top-2 right-2 cursor-pointer"
      />
      <div className="flex flex-col  bottom-4 left-4 z-10">
        <div className="flex gap-x-4 font-light text-xs">
          <p>{movie.release_date ? release_date?.slice(0, 4) : "N/A"}</p>
          <div className="flex gap-x-1">
            <div className="flex gap-x-2">
              <p className="opacity-50">•</p>
              <img src={movieIcon} alt="Movie Icon" />
            </div>
            <p>{movie.media_type ? movie.media_type : "Movie"}</p>
          </div>
          <div className="flex gap-x-2">
            <p className="opacity-50">•</p>
            <p>PG</p>
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
