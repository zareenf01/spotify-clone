import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import { setUri } from "./features/playerSlice";

const spotify = new SpotifyWebApi();

function Player({ token }) {
  const uri = useSelector((state) => state?.player?.uri);

  const [liked, setLiked] = useState(false);
  const [pause, setPause] = useState(true);
  const totalDur = 200;
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(
    () => {
      const intervalId = setInterval(() => {
        if (!pause) {
          setCurrentTime((prev) => (prev < totalDur ? prev + 1 : 0));
        }
      }, 1000);
      return () => clearInterval(intervalId);
    },
    [pause],
    [totalDur]
  );
  const progressPercent = (currentTime / totalDur) * 100;
  const isLiked = () => {
    setLiked((prev) => !prev);
  };
  const isPaused = () => {
    setPause((prev) => !prev);
  };

  useEffect(() => {
    if (token) {
      spotify.setAccessToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (uri) {
      spotify.play({
        uris: [uri],
      });
    }
  }, [uri]);

  return (
    <div className="bg-black h-20 bg-fixed flex items-center justify-between">
      <div className=" m-2 rounded-md flex items-center ">
        <div className="">
          <img
            src="https://i.scdn.co/image/ab67616d00004851baea99dcf7614578bf5c3d10"
            alt=""
            className=" rounded-md"
          />
        </div>
        <div className="mx-2">
          <h2 className="text-white mx-3 text-md text-left font-semibold">
            Maharani
          </h2>
          <div className="flex items-center">
            <h3 className="text-left text-xs ml-3 font-semibold text-[#828282]">
              Playlist •
            </h3>
            <h3 className="text-left text-xs mx-1 font-semibold text-[#828282]">
              songs
            </h3>
          </div>
        </div>
        {liked ? (
          <IoIosHeart
            color="#42ac36"
            size="1.3rem"
            className="mx-16 cursor-pointer"
            onClick={isLiked}
          />
        ) : (
          <IoIosHeartEmpty
            color="#828282"
            size="1.3rem"
            className="mx-16 cursor-pointer"
            onClick={isLiked}
          />
        )}
      </div>
      <div className="flex-col mx-5 itmes-center justify-center">
        {token && uri && (
          <SpotifyPlayer
            token={token}
            uris={uri ? [uri] : []}
            callback={(state) => {
              if (state.track) {
                console.log("Playback state:", state);
              }
            }}
          />
        )}
        <div className="flex mx-5 itmes-center justify-center">
          <img src="/images/back.png" alt="" className="w-14 h-10 mx-3" />
          <img
            src={pause ? "/images/play.png" : "/images/pause.png"}
            alt=""
            className="bg-white p-2 cursor-pointer rounded-full"
            onClick={isPaused}
          />
          <img src="/images/next.png" alt="" className="w-14 h-10 mx-3" />
        </div>
        <div className="flex items-center">
          <span className="text-white mr-2">{formatTime(currentTime)}</span>
          <div className="relative w-96 h-1 bg-[#4f4f4f] rounded-full">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-white ml-2"> {formatTime(totalDur)}</span>
        </div>
      </div>
    </div>
  );
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;
    return `${min}:${remainingSec < 10 ? "0" : ""}${remainingSec}`;
  }
}

export default Player;
