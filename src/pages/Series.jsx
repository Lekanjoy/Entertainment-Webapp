import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { UserContext } from "../App";
import SkeletonLoaderMovies from "../components/SkeletonLoaderMovies";
import TV from "../components/TV";

const Series = () => {
  const {
    series,
    setSeries,
    searchTermSeries,
    setSearchTermSeries,
    loadingSeries,
    setLoadingSeries,
  } = useContext(UserContext);

  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;

  // GET TV SERIS SEARCH RESULTS
  useEffect(() => {
    if (searchTermSeries !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${searchTermSeries}&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => {
          setSeries(data.results);
          setLoadingSeries(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchTermSeries]);

   useEffect(() => {
    document.title = 'Popular TVs'  //Modify Func Later
  });

  return (
    <section className="px-4 pb-12 lg:pl-32">
      <SearchBar
        searchTerm={searchTermSeries}
        setSearchTerm={setSearchTermSeries}
        placeholder="Search for TV"
      />
      <div className="my-6 font-light text-xl tracking-[-0.3125px] flex gap-x-2 items-center ">
        <h1 className="text-xl">Popular</h1>
        <p className="border font-medium py-[1px] text-xs px-2 rounded-md">
          TV
        </p>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Map through TV series and show Skeleton Loader when loading  */}
        {loadingSeries
          ? [...Array(20)].map((_, i) => <SkeletonLoaderMovies key={i} />)
          : series.map((tv) => (
              <Link key={tv.id} to={`/series/tv/${tv.id}`}>
                <TV movie={tv} />
              </Link>
            ))}
      </div>
    </section>
  );
};

export default Series;
