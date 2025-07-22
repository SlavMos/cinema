import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

const excludeGenres = [
  "",
  "новости",
  "для взрослых",
  "церемония",
  "реальное тв",
  "ток-шоу",
];

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
    getFilms: builder.query({
      query: ({
        countries,
        genreId,
        order = "NUM_VOTE",
        type = "FILM",
        year,
        page,
      }) =>
        `/api/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${year}&yearTo=${year}&page=${page}`,
    }),

    getGenreAndCountries: builder.query({
      query: () => "/api/v2.2/films/filters",
      transformResponse: (response) => ({
        ...response,
        genres: response.genres.filter(
          (genre) => !excludeGenres.includes(genre.genre.toLowerCase())
        ),
      }),
    }),

    getFilm: builder.query({
      query: (id) => `/api/v2.2/films/${id}`,
    }),

    getSequelAndPrequels: builder.query({
      query: (id) => `/api/v2.1/films/${id}/sequels_and_prequels`,
      transformErrorResponse: (response) =>
        response.map((el) => ({ ...el, kinopoiskId: el.filmId })),
    }),
    getStaff: builder.query({
      query: (id) => `/api/v1/staff?filmId=${id}`,
    }),
  }),
});

export const {
  useGetFilmQuery,
  useGetSequelAndPrequelsQuery,
  useGetStaffQuery,
  useGetFilmsTopQuery,
  useGetFilmsQuery,
  useGetGenreAndCountriesQuery,
} = kinopoiskAPI;
