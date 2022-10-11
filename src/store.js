import { configureStore } from "@reduxjs/toolkit";
import favListSlice from "./features/favListSlice";
import stableCoinSlice from "./features/stableCoinSlice";

export const store = configureStore({
  reducer: {
    showStable: stableCoinSlice,
    showFavList: favListSlice,
  },
});
