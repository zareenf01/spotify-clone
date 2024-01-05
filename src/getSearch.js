import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = "https://api.spotify.com/v1";

export const searchResult = async (query, token) => {
  try {
    const response = await axios.get(`${baseUrl}/search`, {
      params: {
        q: encodeURIComponent(query),
        type: "track",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.tracks.items;
  } catch (error) {
    console.log("Error fetching search result", error);
    throw error;
  }
};
