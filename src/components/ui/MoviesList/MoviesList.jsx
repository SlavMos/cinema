import { Stack } from "@mui/material";
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesList({ movies }) {
  console.log(movies);
  return (
    <>
      <Stack flexWrap="wrap" justifyContent="center" direction="row">
        {movies.map((movie) => (
          <MoviesCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </Stack>
    </>
  );
}
