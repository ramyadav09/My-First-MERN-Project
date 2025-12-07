import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import feedReducer from "../features/user/feedSlice";
import connectionReducer from "../features/user/connectionSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});
export default store;
