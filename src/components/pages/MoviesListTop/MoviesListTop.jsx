import React from "react";
import { useGetFilmsTopQuery } from "../../../services/kinopoiskAPI";

export default function MoviesListTop() {
  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: "TOP_POPULAR_ALL",
    page: 1,
  });
  console.log(data, error, isLoading);
  console.log("MoviesListTop mounted");
  return <div>MoviesListTop</div>;
}
