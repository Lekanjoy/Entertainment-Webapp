import React from "react";
import trendingImg from "../assets/trending-assets/trendingImg.svg";
import bookmarkIcon from "../assets/trending-assets/bookmarkIcon.svg";
import movieIcon from "../assets/trending-assets/movieIcon.svg";

const Trending = ({trending}) => {
    const release_date = trending.release_date;

  return (
    <div className="trendingLogo relative min-w-[240px] min-h-[140px]">
      <div className="max-w-[240px] max-h-[40px]  rounded-lg object-contain">
        <img
          src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`}
          alt="Movie name"
          className=" w-full h-full"
        />
      </div>
      <img
        src={bookmarkIcon}
        alt="Bookmark Icon"
        className="absolute top-2 right-2"
      />
      <div className="flex flex-col absolute bottom-4 left-4">
        <div className="flex gap-x-4 font-light text-xs">
          <p>{release_date?.slice(0, 4)}</p>
          <div className="flex gap-x-1">
            <div className="flex gap-x-2">
              <p className="opacity-50">•</p>
              <img src={movieIcon} alt="Movie Icon" />
            </div>
            <p>{trending.media_type}</p>
          </div>
          {trending.adult === true ? (
            <div className="flex gap-x-2">
              <p className="opacity-50">•</p>
              <p>PG</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <h2 className="text-[15px] font-medium mt-1">{trending.title}</h2>
      </div>
    </div>
  );
};

export default Trending;
// 
