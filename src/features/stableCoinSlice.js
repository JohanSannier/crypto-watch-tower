import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const stableCoinSlice = createSlice({
  name: "showStable",
  initialState,
  reducers: {
    showStableCoins: (state, { payload }) => {
      return payload;
    },
  },
});

export const { showStableCoins } = stableCoinSlice.actions;

export default stableCoinSlice.reducer;
