import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import s from "./MoviesCard.module.css";
export default function MoviesCard({ movie }) {
  return (
    <Stack>
      <Link to={`/movie/${movie.kinopoiskId}`}>
        <img
          className={s.img}
          src={movie.posterUrlPreview}
          alt={movie.nameRu}
        />
      </Link>
      <Typography textAlign="center">
        {movie.nameRu ? movie.nameRu : movie.nameEn}
      </Typography>
    </Stack>
  );
}
