import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import { LuBell } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistTracks } from "./tracks";
import Recent from "./Recent";
import Liked from "./Liked";
import Search from "./Search";
import SearchResult from "./SearchResult";
import { setUri } from "./features/playerSlice";

function Hero({ showSearch, toggleSearch }) {
  const dispatch = useDispatch();
  const handleSearchClick = () => {
    toggleSearch();
  };
  const user = useSelector((state) => state.user.data);
  // console.log("👋", user);
  const [tracks, setTracks] = useState([]);

  const selectedPlaylist = useSelector((state) => state.playlist.selected);

  const selectedLiked = useSelector((state) => state.playlist.likedSelected);
  // console.log("Likedd", selectedLiked);
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const getTime = () => {
      const currentTime = new Date().getHours();

      if (currentTime >= 5 && currentTime <= 12) {
        setGreeting("Good morning");
      } else if (currentTime >= 12 && currentTime <= 17) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };
    getTime();
  }, []);

  useEffect(
    () => {
      const fetchTracks = async () => {
        if (selectedPlaylist) {
          const trackResponse = await fetchPlaylistTracks(selectedPlaylist.id);
          setTracks(trackResponse.items || []);
        }
      };
      fetchTracks();
    },
    [selectedPlaylist],
    [selectedLiked]
  );
  // console.log("TRACKSSS", tracks);
  const searchResult = useSelector((state) => state.search.data);

  const handleTrackClick = (trackClick) => {
    const uri = trackClick.track.uri;
    uri && dispatch(setUri(uri));
    console.log("URI :", uri);
  };

  return (
    <>
      <div className="md:mx-3 md:-ml-12 lg:ml-4 gradient hero bg-fixed rounded-lg overflow-y-scroll">
        <div className="flex flex-col p-2 rounded-lg">
          <div className=" p-4 flex items-center bg-[#261d58] sticky top-0 -m-2 z-50">
            <div className="flex items-center  ">
              <div className="mx-2 p-2 w-8 rounded-full bg-[#1f1f1f8c] text-sm font-bold cursor-pointer">
                <IoIosArrowBack size="1rem" color="#fff" />
              </div>
              <div className=" p-1.5 w-8 rounded-full bg-[#1f1f1f8c] text-sm font-bold cursor-pointer">
                <GrFormNext size="1.2rem" color="#fff" />
              </div>
              <div className="mx-5">{showSearch && <Search />}</div>

              <div className="flex items-center absolute right-5 m-2">
                <div className="mx-2 p-2 w-10 rounded-full bg-[#1f1f1fd3] text-sm font-bold  cursor-pointer">
                  <LuBell size="1.3rem" color="#fff" />
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src={user && user.images[0].url}
                    alt=""
                    className="rounded-full  bg-[#1f1f1fd3] p-1 w-10 cursor-pointer mx-2 relative"
                  />
                  <h2 className="text-white font-semibold text-center text-sm mt-1 py-1 px-2.5 bg-black rounded-lg absolute  bottom-0 transform hover:translate-y-8 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    {user && user.display_name}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {searchResult && <SearchResult />}

          {selectedPlaylist && (
            <>
              <div className="p-2 m-2 mt-5 rounded-md flex items-end cursor-pointer">
                {/* image */}
                <div>
                  <img
                    src={
                      selectedPlaylist &&
                      selectedPlaylist.images &&
                      selectedPlaylist.images[0]?.url
                    }
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
                    {selectedPlaylist && selectedPlaylist.name}
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
                      {selectedPlaylist &&
                        selectedPlaylist.tracks &&
                        selectedPlaylist.tracks.total}{" "}
                      songs
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

          {selectedLiked && !selectedPlaylist && (
            <>
              <Liked key={selectedLiked.id} />
            </>
          )}

          {!selectedPlaylist && !selectedLiked && (
            <>
              <h1 className="mx-4 mt-2 text-3xl text-white text-left font-bold ">
                {greeting}
              </h1>

              <div>
                <Recent />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Hero;
