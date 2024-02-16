import { createSlice } from "@reduxjs/toolkit";

export const currentSlice = createSlice({
  name: "current",
  initialState: {
    data: null,
  },

  reducers: {
    setCurrent: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCurrent } = currentSlice.actions;

export default currentSlice.reducer;
