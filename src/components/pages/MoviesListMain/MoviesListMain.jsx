import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import MoviesList from "../../ui/MoviesList/MoviesList";
import { ArrowBack } from "@mui/icons-material";
import MoviesSkeleton from "../MoviesPage/MoviesSkeleton";
import { MOVIES_LISTS } from "../../../constants";
import { useGetFilmsQuery } from "../../../services/kinopoiskAPI";
import { useSelector } from "react-redux";
import SelectMovies from "../../ui/SelectMovies/SelectMovies";

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

  const myGenreId = movieType.url === "cartoons" ? 18 : genreId;

  const { data, error, isLoading } = useGetFilmsQuery({
    type: movieType.value,
    page,
    countries,
    order,
    year,
    genreId: myGenreId,
  });

  if (error) return <p>Some error</p>;
  if (isLoading) return <MoviesSkeleton />;

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType.title}</Typography>
      </Stack>
      <SelectMovies
        countries={countries}
        order={order}
        year={year}
        genreId={genreId}
      />
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
