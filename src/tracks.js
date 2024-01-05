import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();

export const fetchPlaylistTracks = async (playlistId) => {
  try {
    const response =
      (await spotify.getPlaylistTracks(playlistId)) ||
      (await spotify.getMySavedTracks(playlistId));
    return response;
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    throw error;
  }
};
export const fetchLikedTracks = async () => {
  try {
    const response = await spotify.getMySavedTracks();
    return response;
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    throw error;
  }
};
