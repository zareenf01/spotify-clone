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
  const current = useSelector((state) => state?.current?.data);
  console.log(current);

  const totalDur = current?.item?.duration_ms;
  const formattedDur = formatTime(totalDur);
  const progressMs = current?.progress_ms;
  const isPlaying = current?.item?.is_playing;

  const [liked, setLiked] = useState(false);
  const [pause, setPause] = useState(isPlaying);

  const progressPercent = (progressMs / totalDur) * 100;

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

  useEffect(() => {
    if (current) {
      console.log("CURRENTT", current);
    }
  }, [current]);

  return (
    <div className="bg-black h-20 bg-fixed flex items-center justify-between">
      <div className=" m-2 rounded-md flex items-center ">
        <div className="">
          <img
            src={current && current.item?.album?.images[2]?.url}
            alt=""
            className=" rounded-md"
          />
        </div>
        <div className="mx-2">
          <h2 className="text-white mx-3 text-md text-left font-semibold">
            {current && current.item?.name}
          </h2>
          <div className="flex items-center">
            <h3 className="text-left text-xs ml-3 font-semibold text-[#828282]">
              {current && current.item?.artists[0]?.name}
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
          <span className="text-white mr-2">{formatTime(progressMs)}</span>
          <div className="relative w-96 h-1 bg-[#4f4f4f] rounded-full">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-white ml-2"> {formattedDur}</span>
        </div>
      </div>
    </div>
  );

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
}

export default Player;
