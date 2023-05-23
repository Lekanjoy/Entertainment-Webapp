import React, { useContext } from "react";
import Movie from "./Movie";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import SkeletonLoaderMovies from "./SkeletonLoaderMovies";

const Recommended = () => {
  const { recommended, loadingRecommended, searchTerm } = useContext(UserContext);

  if (loadingRecommended) {
    return (
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(10)].map((_, i) => (
          <SkeletonLoaderMovies key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      {recommended.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommended.map((result) => {
            return (
              <Link key={result.id} to={`/movies/movie/${result.id}`}>
                <Movie movie={result} />
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="font-light text-lg text-center py-6">
          No recommendations yet
        </p>
      )}
    </>
  );
};

export default Recommended;
