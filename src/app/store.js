import { configureStore } from "@reduxjs/toolkit";
import currentQueryReducer from "../feaTures/currentQuerySlice";
import { kinopoiskAPI } from "../services/kinopoiskAPI";
import searchQueryReducer from "../features/searchQuerySlice";

export const store = configureStore({
  reducer: {
    [kinopoiskAPI.reducerPath]: kinopoiskAPI.reducer,
    currentQuery: currentQueryReducer,
    searchQuerySlice: searchQueryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kinopoiskAPI.middleware),
});
