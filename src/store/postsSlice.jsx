import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  latestPosts: [],
  displaySetting: { perPage: 0, totalPosts: 0 },
  currentPage: 1,
};

const postSlice = createSlice({
  name: "postsDisplay",

  initialState,

  reducers: {
    updatePosts(state, action) {
      state.allPosts = action.payload;
    },

    updateLatestPosts(state, action) {
      state.latestPosts = action.payload;
    },

    setDisplaySetting(state, action) {
      state.displaySetting = { ...action.payload };
    },

    updateCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
