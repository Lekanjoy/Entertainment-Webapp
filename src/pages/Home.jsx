import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../components/SearchBar";
import Recommended from "../components/Recommended";
import { UserContext } from "../App";
import Title from "../components/Title";
import SearchResultsOrTrending from "../components/SearchResultsOrTrending";

const Home = () => {
  const { searchTerm, setSearchTerm, trending, loadingTrending } =
    useContext(UserContext);

  const [toolTip, setToolTip] = useState(false);
   useEffect(() => {
     document.title = 'Home | Entertainment WebApp' //Modify Func Later
   });

  return (
    <main className="px-4 lg:pl-32">
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
          <p
            onMouseEnter={() => setToolTip(true)}
            onMouseLeave={() => setToolTip(false)}
            className="border font-medium mt-1 text-xs px-2 rounded-md cursor-pointer hidden lg:block "
          >
            ὶ
          </p>
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
