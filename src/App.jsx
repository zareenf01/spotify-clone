import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home";
import { getToken } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { setUser } from "./features/userSlice";
import { setLiked, setRecentPlay } from "./features/playlistSlice";
import { setRecent, setPlayToken } from "./features/recentSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPg from "./LoginPg";
import { searchResult } from "./getSearch";

const spotify = new SpotifyWebApi();

function App() {
  const result = searchResult();
  console.log(result);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          spotify.setAccessToken(token);

          const user = await spotify.getMe();
          user && dispatch(setUser(user));

          const liked = await spotify.getMySavedTracks();
          liked && dispatch(setLiked(liked));

          const recent = await spotify.getMyRecentlyPlayedTracks();
          recent && dispatch(setRecent(recent));

          const playlistsResponse = await spotify.getUserPlaylists(user.id);
          const playlists = playlistsResponse.items;
          playlists && dispatch(setRecentPlay(playlists));

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, dispatch]);

  useEffect(() => {
    const hash = getToken();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      sessionStorage.setItem("spotifyToken", _token);
      setToken(_token);
      _token && dispatch(setPlayToken(_token));
    } else {
      const storedToken = sessionStorage.getItem("spotifyToken");
      if (storedToken) {
        setToken(storedToken);
        storedToken && dispatch(setPlayToken(storedToken));
      }
    }
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Routes>
          {token ? (
            <Route path="/home" element={<Home />} token={token} />
          ) : (
            <Route path="/" element={<LoginPg />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
