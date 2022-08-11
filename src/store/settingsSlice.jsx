import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog_name: '',
  name: '',
  email: '',
  about: '',
};

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {

    set(state, action) {
      state.blog_name = action.payload.blog_name;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.about = action.payload.about;
    },

  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
