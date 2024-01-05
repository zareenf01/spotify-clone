import { createSlice } from "@reduxjs/toolkit";

export const likedSlice = createSlice({
  name: "liked",
  initialState: {
    data: null,
    recent: null,
    selected: null,
    likedSelected: null,
  },
  reducers: {
    setLiked: (state, action) => {
      state.data = action.payload;
    },
    setRecentPlay: (state, action) => {
      state.recent = action.payload;
    },
    setSelectedPlay: (state, action) => {
      state.selected = action.payload;
    },
    setLikedPlay: (state, action) => {
      state.likedSelected = action.payload;
    },
  },
});

export const { setLiked, setRecentPlay, setSelectedPlay, setLikedPlay } =
  likedSlice.actions;
export default likedSlice.reducer;
