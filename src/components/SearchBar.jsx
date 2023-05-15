import React from "react";
import searchIcon from "../assets/header-assets/search.svg";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="relative pt-24 w-full ">
      <label htmlFor="search">
        <img
          src={searchIcon}
          alt="Search Icon"
          className="absolute cursor-pointer "
        />
      </label>
      <input
        onChange={handleSearch}
        value={searchTerm}
        type="search"
        id="search"
        placeholder={placeholder}
        className="w-2/3  caret-redColor  pl-8 pb-3 bg-transparent border-0 outline-none text-white font-light focus:border-b focus:border-b-[#5A698F]"
      />
    </form>
  );
};

export default SearchBar;
