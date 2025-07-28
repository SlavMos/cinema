import { configureStore } from "@reduxjs/toolkit";
import currentQueryReducer from "../feaTures/currentQuerySlice";
import { kinopoiskAPI } from "../services/kinopoiskAPI";
import { searchQuerySlice } from "../features/searchQuerySlice";

export const store = configureStore({
  reducer: {
    [kinopoiskAPI.reducerPath]: kinopoiskAPI.reducer,
    currentQuery: currentQueryReducer,
    searchQuerySlice: searchQuerySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kinopoiskAPI.middleware),
});
