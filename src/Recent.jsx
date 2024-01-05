import React from "react";
import { useSelector } from "react-redux";

function Recent() {
  const recent = useSelector((state) => state.recent.data.items);
  //   console.log("🆕", recent);

  const firstSix = recent ? recent.slice(0, 6) : [];

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mt-5 mx-3">
        {firstSix &&
          firstSix.map((recentPlay) => (
            <div className=" bg-[#82828221] duration-300 hover:bg-[#bcbcbc37] rounded-md flex items-center cursor-pointer">
              {/* image */}
              <div className="">
                <img
                  src={recentPlay.track.album.images[2].url}
                  alt=""
                  className="h-12 rounded-tl rounded-bl-md"
                />
              </div>

              {/* details */}
              <div className="mx-2">
                <h2 className="text-white text-md text-left font-semibold">
                  {recentPlay.track.name}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Recent;
