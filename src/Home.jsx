import React, { useState } from "react";
import "./App.css";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import YourLib from "./YourLib";
import Hero from "./Hero";
import Player from "./Player";
import { useSelector } from "react-redux";

// function ResizableYourLib() {
//   return (
//     <ResizableBox
//       width={400} // initial width
//       height={300}
//       minConstraints={[100, 300]} // minimum width and height
//       maxConstraints={[400, 600]} // maximum width and height
//       axis="x"
//       <YourLib />
//     </ResizableBox>
//   );
// }

function Home({ token }) {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="bg-black h-screen">
      <div className="p-2 flex flex-col md:flex-row">
        <div className="min-w-96 hidden md:block">
          <div className="flex flex-col justify-center p-2 bg-[#1b1b1bb6] rounded-lg md:max-w-xs lg:max-w-sm">
            <div className="mx-2 m-2 flex items-center">
              <GoHomeFill size="1.5rem" color="#fff" />
              <h2 className="text-white text-md font-bold mx-5">Home</h2>
            </div>
            <div
              className="mx-2 my-3 flex items-center cursor-pointer"
              onClick={toggleSearch}
            >
              <IoSearch size="1.5rem" color="#9d9d9d" />
              <h2 className="text-[#9d9d9d] text-md font-bold mx-5 hover:text-white">
                Search
              </h2>
            </div>
          </div>
          <YourLib />
        </div>

        <div className="flex-grow md:w-full">
          <Hero showSearch={showSearch} toggleSearch={toggleSearch} />
        </div>
      </div>
      <Player token={token} />
    </div>
  );
}

export default Home;
