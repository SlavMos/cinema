import { Rating, Stack, Tooltip, Typography, Box, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import s from "./MoviesCard.module.css";
import { LibraryAdd } from "@mui/icons-material";
export default function MoviesCard({ movie }) {
  return (
    <Stack>
      <RouterLink to={`/movie/${movie.kinopoiskId}`}>
        <img
          className={s.img}
          src={movie.posterUrlPreview}
          alt={movie.nameRu}
        />
      </RouterLink>

      <Link
        textAlign="center"
        component={RouterLink}
        to={`/movie/${movie.kinopoiskId}`}
        sx={{ width: "200px" }}
      >
        {movie.nameRu ? movie.nameRu : movie.nameEn}
      </Link>

      {movie.ratingKinopoisk && (
        <Stack alignItems="center">
          <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
            <Box>
              <Rating
                name="read-only"
                value={movie.ratingKinopoisk / 2}
                readOnly
                precision={0.1}
              />
            </Box>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
}
