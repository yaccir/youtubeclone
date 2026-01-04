import { createSlice } from "@reduxjs/toolkit";

const youtubeSlice = createSlice({
  name: "youtube",
  initialState: {
    items: [],
    token: localStorage.getItem("token"), // ✅ single source of truth
    burger: false,
    searchinput: "",
  },
  reducers: {
    fetchvid: (state, action) => {
      state.items = action.payload;
    },

    settoken: (state, action) => {
      state.token = action.payload;

    
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },

    setburger: (state) => {
      state.burger = !state.burger;
    },

    setsearch: (state, action) => {
      state.searchinput = action.payload;
    },
  },
});

export const { setsearch, fetchvid, setburger, settoken } =
  youtubeSlice.actions;

export default youtubeSlice.reducer;
