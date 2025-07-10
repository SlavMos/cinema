import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

export const kinopoiskAPI = createApi({
  reducerPath: "kinopoiskAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kinopoiskapiunofficial.tech/",
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", kinopoiskApiKey);
      headers.set("Content-type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getFilmsTop: builder.query({
      query: ({ type, page }) =>
        `/api/v2.2/films/collections?type=${type}&page=${page}`,
    }),
  }),
});

export const { useGetFilmsTopQuery } = kinopoiskAPI;
