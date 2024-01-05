import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedPlay, setLikedPlay } from "./features/playlistSlice";

function Cards() {
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.playlist.data);
  const recentPlay = useSelector((state) => state.playlist.recent);
  const user = useSelector((state) => state.user.data);
  // console.log("Recentt", recentPlay);
  // console.log("🎼", liked);

  const selectedPlaylist = (clickedPlaylist) => {
    const playAll = dispatch(setSelectedPlay(clickedPlaylist));
    // console.log("Clicked Playlist:", clickedPlaylist);
  };
  const LikedPlaylist = (clickedLiked) => {
    const playLiked = dispatch(setLikedPlay(clickedLiked));
  };

  return (
    <div>
      {/* <Link to=""> */}
      <div
        className="p-2 m-2 hover:bg-[#1b1b1bd5] rounded-md flex items-center cursor-pointer"
        onClick={() => LikedPlaylist(liked)}
      >
        {/* image */}
        <div>
          <img src="/images/liked.jpeg" alt="" className="h-12 rounded-md" />
        </div>

        {/* details */}
        <div className="mx-2">
          <h2 className="text-white text-md text-left font-medium">
            Liked Songs
          </h2>
          <div className="flex items-center">
            <h3 className="text-left text-xs font-semibold text-[#828282]">
              Playlist •
            </h3>

            <h3 className="text-left text-xs mx-1 font-semibold text-[#828282]">
              {liked && liked.total} songs
            </h3>
          </div>
        </div>
      </div>

      {recentPlay &&
        recentPlay.map((allPlaylists) => (
          <div
            className="p-2 m-2 hover:bg-[#1b1b1bd5] rounded-md flex items-center cursor-pointer"
            key={allPlaylists.id}
            onClick={() => selectedPlaylist(allPlaylists)}
          >
            {/* image */}
            <div>
              <img
                src={
                  (allPlaylists &&
                    allPlaylists.images &&
                    allPlaylists.images[2]?.url) ||
                  allPlaylists.images[0]?.url
                }
                alt=""
                className="h-12 rounded-md"
              />
            </div>

            {/* details */}
            <div className="mx-2">
              <h2 className="text-white text-md text-left font-medium overflow-hidden  whitespace-nowrap overflow-ellipsis">
                {allPlaylists && allPlaylists.name}
              </h2>
              <div className="flex items-center">
                <h3 className="text-left text-xs font-semibold text-[#828282]">
                  Playlist •
                </h3>

                <h3 className="text-left text-xs mx-1 font-semibold text-[#828282]">
                  {user && user.display_name}
                </h3>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Cards;
