import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./features/authSlice";
import { userSlice } from "./features/userSlice";
import { likedSlice } from "./features/playlistSlice";
import { recentSlice } from "./features/recentSlice";
import { searchSlice } from "./features/searchSlice";
import { currentSlice } from "./features/currentSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  playlist: likedSlice.reducer,
  recent: recentSlice.reducer,
  search: searchSlice.reducer,
  current: currentSlice.reducer,
});

export default rootReducer;
