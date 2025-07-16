import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import MoviesList from "../../ui/MoviesList/MoviesList";
import { ArrowBack } from "@mui/icons-material";
import MoviesListSkeleton from "../../ui/MoviesListSkeleton/MoviesListSkeleton";
import { MOVIES_LISTS } from "../../../constants";
import { useGetFilmsQuery } from "../../../services/kinopoiskAPI";
import { useSelector } from "react-redux";

export default function MoviesListMain() {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const movieType = MOVIES_LISTS.find((el) => el.url === location.pathname);

  useEffect(() => {
    setPage(1);
  }, [location]); //если мы перейдем на другую страницу пагинация буде на 1 странице

  const { countries, order, year, genreId } = useSelector(
    (state) => state.currentQuery
  );

  const { data, error, isLoading } = useGetFilmsQuery({
    type: movieType.value,
    page,
    countries,
    order,
    year,
    genreId,
  });

  if (error) return <p>Some error</p>;
  if (isLoading) return <MoviesListSkeleton />;

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType.title}</Typography>
      </Stack>
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
