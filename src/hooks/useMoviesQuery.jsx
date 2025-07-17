import React from "react";
import { useSelector } from "react-redux";
import {
  useGetFilmsQuery,
  useGetFilmsTopQuery,
} from "../services/kinopoiskAPI";
import { TOP_LISTS } from "../constants";

export default function useMoviesQuery() {
  const { countries, order, year, page } = useSelector(
    (state) => state.currentQuery
  );

  const responsePopular = useGetFilmsTopQuery({
    type: TOP_LISTS[0].value,
    page,
  });

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LISTS[1].value,
    page,
  });

  const responseFilms = useGetFilmsQuery({
    type: "FILM",
    countries,
    genreId: "1",
    order,
    year,
    page,
  });

  const responseSerials = useGetFilmsQuery({
    type: "TV_SHOW",
    countries,
    genreId: "1",
    order,
    year,
    page,
  });
  const responseCartons = useGetFilmsQuery({
    type: "FILM",
    countries,
    genreId: "18",
    order,
    year,
    page,
  });
  const isLoading =
    responsePopular.isFetching ||
    responseBest.isFetching ||
    responseFilms.isFetching ||
    responseSerials.isFetching ||
    responseCartons.isFetching;

  const hasError =
    responsePopular.error ||
    responseBest.error ||
    responseFilms.error ||
    responseSerials.error ||
    responseCartons.error;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartons,
  };
}
