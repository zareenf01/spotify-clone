import React from "react";
import Liked from "./Liked";
import { IoSearch } from "react-icons/io5";
import Cards from "./Cards";

function YourLib() {
  return (
    <div className="mt-3">
      <div className="flex flex-col p-2 bg-[#1b1b1bb6] rounded-lg md:max-w-xs lg:max-w-sm h-96 overflow-x-hidden overflow-y-scroll ">
        <div className="mx-2 m-3 flex items-center">
          <img src="/images/lib.png" alt="" className="w-36" />
        </div>
        <div className="mx-2 my-2 flex items-center">
          <h2 className="text-white py-1.5 px-3 rounded-full bg-[#1f1f1f] text-sm font-bold  hover:bg-[#272727] cursor-pointer">
            Playlists
          </h2>
          <h2 className="text-white mx-3 py-1.5 px-2 rounded-full bg-[#1f1f1f] text-sm font-bold  hover:bg-[#272727] cursor-pointer">
            Artists
          </h2>
        </div>
        <div className="mx-3 p-2 w-8 hover:rounded-full hover:bg-[#1f1f1f] text-sm font-bold  cursor-pointer">
          <IoSearch size="1rem" color="#fff" />
        </div>
        <Cards />
      </div>
    </div>
  );
}

export default YourLib;
