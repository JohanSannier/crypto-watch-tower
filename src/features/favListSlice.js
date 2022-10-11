import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const favListSlice = createSlice({
  name: "showFavList",
  initialState,
  reducers: {
    favListDisplay: (state, { payload }) => {
      return payload;
    },
  },
});

export const { favListDisplay } = favListSlice.actions;

export default favListSlice.reducer;
