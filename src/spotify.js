export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "https://zareen-spotifyclone.netlify.app/home";
const clientID = "00de0ec13cae4e43beda8c94b7250a97";

const scopes = [
  "streaming",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-top-read",
  "user-library-read",
  "user-library-modify",
  "user-read-email",
  "user-read-private",
  "user-read-recently-played",
  "user-read-playback-position",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
];

export const getToken = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const loginURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
