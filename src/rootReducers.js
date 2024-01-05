import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./features/authSlice";
import { userSlice } from "./features/userSlice";
import { likedSlice } from "./features/playlistSlice";
import { recentSlice } from "./features/recentSlice";
import { searchSlice } from "./features/searchSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  playlist: likedSlice.reducer,
  recent: recentSlice.reducer,
  search: searchSlice.reducer,
});

export default rootReducer;
