import React from "react";
import searchIcon from "../assets/header-assets/search.svg";

const SearchBar = ({searchTerm, setSearchTerm, placeholder}) => {

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="relative  mt-6 w-full">
      <label htmlFor="search">
        <img src={searchIcon} alt="Search Icon" className="absolute cursor-pointer " />
      </label>
      <input
        onChange={handleSearch}
        value={searchTerm}
        type="search"
        id="search"
        placeholder={placeholder}
        className="w-2/3 h-6  pl-8 bg-transparent border-none outline-none text-white font-light"
      />
    </form>
  );
};

export default SearchBar;
