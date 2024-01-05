import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    uri: null,
  },

  reducers: {
    setUri: (state, action) => {
      state.uri = action.payload;
    },
  },
});

export const { setUri } = playerSlice.actions;
export default playerSlice.reducer;
