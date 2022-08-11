import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postsSlice";
import commentReducer from "./CommentsSlice";
import settingsReducer from './settingsSlice';

const store = configureStore({
  reducer: {
      userDisplay: userReducer,
      postsDisplay: postReducer,
      settings: settingsReducer,
      comment: commentReducer
  },
});

export default store;
