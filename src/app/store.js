import { configureStore } from "@reduxjs/toolkit";
import currentQueryReducer from "../feaTures/currentQuerySlice";
import { kinopoiskAPI } from "../services/kinopoiskAPI";

export const store = configureStore({
  reducer: {
    [kinopoiskAPI.reducerPath]: kinopoiskAPI.reducer,
    currentQuery: currentQueryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kinopoiskAPI.middleware),
});
