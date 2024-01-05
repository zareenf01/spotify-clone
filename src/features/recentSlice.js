import { createSlice } from "@reduxjs/toolkit";

export const recentSlice = createSlice({
  name: "recent",
  initialState: {
    data: [],
    token: null,
  },
  reducers: {
    setRecent: (state, action) => {
      state.data = action.payload;
    },

    setPlayToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setRecent, setPlayToken } = recentSlice.actions;
export default recentSlice.reducer;
