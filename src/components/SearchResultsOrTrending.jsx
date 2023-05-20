import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Movie from "./Movie";
import SkeletonLoaderTrending from "./SkeletonLoaderTrending";
import Trending from "./Trending";
import ScrollContainer from "react-indiana-drag-scroll";

const SearchResultsOrTrending = ({ trending, loadingTrending }) => {
  const { searchTerm, searchResults } = useContext(UserContext);

  return (
    <>
      {searchResults.length > 0 && searchTerm !== "" ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults.map((result) => {
            return (
              <Link key={result.id} to={`/movies/movie/${result.id}`}>
                <Movie movie={result} />
              </Link>
            );
          })}
        </div>
      ) : (
        <ScrollContainer vertical={false} className="w-full flex gap-x-4">
          {loadingTrending
            ? [...Array(20)].map((_, i) => <SkeletonLoaderTrending key={i} />)
            : trending.map((item) => (
                <Link key={item.id} to={`/trending/${item.id}`}>
                  <Trending  trending={item} />
                </Link>
              ))}
        </ScrollContainer>
      )}
    </>
  );
};

export default SearchResultsOrTrending;
