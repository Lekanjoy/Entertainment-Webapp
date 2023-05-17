import React, { useContext } from "react";
import { UserContext } from "../App";

const Title = () => {
  const { searchTerm, searchResults } = useContext(UserContext);
  return (
    <>
      {searchResults.length > 0 && searchTerm !== "" ? (
        <p className="font-light text-xl my-6">
          Found {searchResults.length} result
          {searchResults.length > 1 ? "s" : ""} for ‘{searchTerm}’
        </p>
      ) : (
        <div className="mt-6 mb-4 font-light flex gap-x-2 items-center ">
          <h1 className="text-xl">Trending</h1>
          <p className="border font-medium mt-1 text-xs px-2 rounded-md">NOW</p>
        </div>
      )}
    </>
  );
};

export default Title;
