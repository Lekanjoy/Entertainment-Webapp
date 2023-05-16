import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../components/SearchBar";
import Recommended from "../components/Recommended";
import { UserContext } from "../App";
import Title from "../components/Title";
import SearchResultsOrTrending from "../components/SearchResultsOrTrending";

const Home = () => {
  const { searchTerm, setSearchTerm, trending, loadingTrending } = useContext(UserContext);

  const [toolTip, setToolTip] = useState(false);


  return (
    <main className="px-4">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search for movies or TV series"
      />
      <Title />
      <SearchResultsOrTrending
        trending={trending}
        loadingTrending={loadingTrending}
      />
      <section className="mt-6 w-full">
        <h1 className=" mb-4 font-light text-xl flex gap-x-2 items-center relative">
          Recommended for you
          <div
            onMouseEnter={() => setToolTip(true)}
            onMouseLeave={() => setToolTip(false)}
            className="cursor-pointer w-5 h-5 rounded-full bg-[rgba(0,_0,_0,_0.4)] flex justify-center items-center text-xs font-bold italic"
          >
            ὶ
          </div>
          {toolTip && (
            <p className="text-xs font-thin ">
              Based on your most recent search
            </p>
          )}
        </h1>
        <Recommended />
      </section>
    </main>
  );
};

export default Home;
