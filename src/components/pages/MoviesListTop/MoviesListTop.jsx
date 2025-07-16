import React, { useEffect, useState } from "react";
import { useGetFilmsTopQuery } from "../../../services/kinopoiskAPI";
import { TOP_LISTS } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import MoviesList from "../../ui/MoviesList/MoviesList";
import { ArrowBack } from "@mui/icons-material";
import MoviesListSkeleton from "../../ui/MoviesListSkeleton/MoviesListSkeleton";
export default function MoviesListTop() {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const movieType = TOP_LISTS.find((el) => el.url === location.pathname);
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: movieType.value,
    page,
  });
  useEffect(() => {
    setPage(1);
  }, [location]); //если мы перейдем на другую страницу пагинация буде на 1 странице
  if (error) return <p>Some error</p>;
  if (isLoading) return <MoviesListSkeleton />;
  console.log(data);

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
