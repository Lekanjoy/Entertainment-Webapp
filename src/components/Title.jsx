import React,{useContext} from 'react'
import { UserContext } from '../App';

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
        <h1 className="mt-6 mb-4 font-light text-xl">Trending</h1>
      )}
    </>
  );
}

export default Title