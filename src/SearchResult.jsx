import React from "react";
import { useSelector } from "react-redux";

function SearchResult() {
  const result = useSelector((state) => state.search.data);
  console.log("Resulttt", result);
  return (
    <div className="mb-10">
      {result &&
        result.map((songs) => (
          <div
            className="p-2 mx-4 mt-3 px-8 hover:bg-[#84838330] rounded-md flex items-center cursor-pointer"
            key={songs.id}
          >
            {/* image */}
            <div>
              <img
                src={
                  (songs && songs.album && songs.album.images[2]?.url) ||
                  songs.album.images[0]?.url
                }
                alt=""
                className="h-12 rounded-md"
              />
            </div>

            {/* details */}
            <div className="mx-2">
              <h2 className="text-white text-md text-left font-medium overflow-hidden  whitespace-nowrap overflow-ellipsis">
                {songs && songs.name}
              </h2>
              <div className="flex items-center">
                <h3 className="text-left text-xs font-semibold text-[#828282]">
                  {songs && songs.artists && songs && songs.artists[0].name}
                </h3>

                <h3 className="text-left text-xs mx-1 font-semibold text-[#828282]">
                  {}
                </h3>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SearchResult;
