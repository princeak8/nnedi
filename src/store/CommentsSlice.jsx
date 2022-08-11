import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: []
};

const CommentSlice = createSlice({
  name: "Comment",

  initialState,

  reducers: {
    saveComment(state, action) {
        state.comments = action.payload;
    },
  },
});

export const commentActions = CommentSlice.actions;

export default CommentSlice.reducer;
