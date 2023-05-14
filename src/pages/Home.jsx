import React, { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import Trending from "../components/Trending";
import SearchBar from "../components/SearchBar";
import Movie from "../components/Movie";

const Home = () => {
  const API_KEY = import.meta.env.VITE_REACT_APP_TMBDB_API_KEY;
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  const allResults = [...movies, ...tvShows];


  // GET TRENDING MOVIES AND TV SERIES
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setTrending(data.results);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // GET SEARCH RESULTS
  useEffect(() => {
    if (searchTerm !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${searchTerm}&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => {
          const allResults = data.results;
          const movies = allResults.filter((result) => result.media_type === "movie");
          const tvShows = allResults.filter((result) => result.media_type === "tv");
          setMovies(movies);
          setTvShows(tvShows);

          // setSearchResults(data.results);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchTerm]);


  return (
    <main className="px-4">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search for movies or TV series"
      />
      {allResults.length > 0 && searchTerm !== "" ? (
        <p className="font-light text-xl my-6">
          Found {allResults.length} results for ‘{searchTerm}’
        </p>
      ) : (
        <h1 className="mt-6 mb-4 font-light text-xl">Trending</h1>
      )}

      {allResults.length > 0 && searchTerm !== "" ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allResults.map((result) => {
            return <Movie key={result.id} movie={result} />;
          })}
        </div>
      ) : (
        <ScrollContainer vertical={false} className="w-full flex gap-x-4">
          {trending.map((item) => {
            return <Trending key={item.id} trending={item} />;
          })}
        </ScrollContainer>
      )}
    </main>
  );
};

export default Home;
