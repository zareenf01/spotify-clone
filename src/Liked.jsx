import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchLikedTracks } from "./tracks";
import { setUri } from "./features/playerSlice";

function Liked() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const selectedPlaylist = useSelector((state) => state.playlist.likedSelected);
  // console.log("Selectedd", selectedPlaylist);

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      if (selectedPlaylist) {
        const trackResponse = await fetchLikedTracks(selectedPlaylist.id);
        setTracks(trackResponse.items || []);
      }
    };
    fetchTracks();
  }, [selectedPlaylist]);
  // console.log("TRACKSSS", tracks);

  const handleTrackClick = (trackClick) => {
    const uri = trackClick.track.uri;
    uri && dispatch(setUri(uri));
    console.log("URI :", uri);
  };

  return (
    <div>
      {selectedPlaylist && (
        <>
          <div className="p-2 m-2 mt-5 rounded-md flex items-end cursor-pointer">
            {/* image */}
            <div>
              <img
                src="/images/liked.jpeg"
                alt=""
                className="h-48 rounded-md relative"
              />
              <div className="absolute bg-white hover:bg-[#0000001d] h-40"></div>
            </div>

            {/* details */}
            <div className="mx-5">
              <h2 className="text-white text-sm text-left font-medium  mb-2">
                Playlist
              </h2>
              <h2 className="text-white pt-3 pb-4 text-6xl overflow-hidden text-ellipsis  text-left font-bold">
                Liked Songs
              </h2>

              <h3 className="mt-2 text-left text-sm font-medium text-[#c1c1c1]">
                {selectedPlaylist && selectedPlaylist.description}
              </h3>

              <div className="flex items-center mt-2 text-white">
                <img
                  src={user && user.images[0].url}
                  alt=""
                  className="rounded-full w-6 mr-2"
                />

                <h3 className="text-left text-xs font-semibold ">
                  {user && user.display_name} •
                </h3>

                <h3 className="text-left text-xs mx-1 font-medium ">
                  {selectedPlaylist && selectedPlaylist.total} songs
                </h3>
              </div>
            </div>
          </div>

          {/* // tracksss */}

          <div className="flex mx-4 mt-4 mb-8">
            <img
              src="/images/play.png"
              alt=""
              className="p-4 bg-[#22c059] hover:bg-[#2ac15f] hover:scale-105 cursor-pointer rounded-full"
            />
          </div>

          {tracks &&
            tracks.map((track) => (
              <div
                className="p-2 mx-4 mt-3 px-8 hover:bg-[#84838330] rounded-md flex items-center cursor-pointer"
                onClick={() => handleTrackClick(track)}
              >
                {/* image */}
                <div>
                  <img
                    src={
                      (track &&
                        track.track.album &&
                        track.track.album.images[2]?.url) ||
                      track.track.album.images[0]?.url
                    }
                    alt=""
                    className="h-12 rounded-md"
                  />
                </div>

                {/* details */}
                <div className="mx-2">
                  <h2 className="text-white text-md text-left font-medium overflow-hidden  whitespace-nowrap overflow-ellipsis">
                    {track && track.track.name}
                  </h2>
                  <div className="flex items-center">
                    <h3 className="text-left text-xs font-semibold text-[#828282]">
                      {track &&
                        track.track.artists &&
                        track &&
                        track.track.artists[0].name}
                    </h3>

                    <h3 className="text-left text-xs mx-1 font-semibold text-[#828282]">
                      {}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Liked;
