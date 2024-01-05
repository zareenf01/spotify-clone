import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getToken } from "./spotify";
import { searchResult } from "./getSearch";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "./features/searchSlice";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.recent.token);

  const handleSearch = async (query) => {
    try {
      const result = await searchResult(query, token);
      result && dispatch(setSearch(result));
      //   console.log(result);
    } catch (error) {
      console.log("Error fetching search results", error);
    }
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    handleSearch(newQuery);
  };

  return (
    <div className="flex items-center relative">
      <input
        type="search"
        name=""
        id=""
        className="p-3 pl-12 w-80 text-white bg-[#2c2b2bde] hover:bg-[#2c2b2bb5] rounded-full relative placeholder:text-[#939393] placeholder:text-sm border-none"
        placeholder="What do you want to listen to?"
        value={searchQuery}
        onChange={handleChange}
      />
      <IoSearch size="1.5rem" color="#656363" className="absolute left-2.5" />
    </div>
  );
}

export default Search;
