import React from "react";
import { loginURL } from "./spotify";

function Login() {
  return (
    <div className="bg-black md:bg-[rgb(20,20,20)] h-screen">
      <div className="p-3 flex ">
        <div className="md:bg-black w-full md:mx-auto py-20 rounded-lg mt-5 md:h-full md:max-w-3xl">
          <h1 className="text-white text-3xl mx-6 font-bold text-left md:text-center md:text-5xl">
            Log in to Spotify
          </h1>
          <div className="flex justify-center mt-5">
            <button className="py-3.5 px-2 mx-5 w-full md:max-w-xs rounded-full bg-[#1DB954] font-bold hover:scale-105 hover:bg-[#2bd466] mt-40 ">
              <a href={loginURL}>Log in</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
