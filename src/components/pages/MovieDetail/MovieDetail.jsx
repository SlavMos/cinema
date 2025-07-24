import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  kinopoiskAPI,
  useGetFilmQuery,
  useGetSequelAndPrequelsQuery,
  useGetStaffQuery,
} from "../../../services/kinopoiskAPI";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import { ArrowBack, Language, NavigateBeforeSharp } from "@mui/icons-material";
import MoviesCard from "../../ui/MoviesCard/MoviesCard";

export default function MovieDetail() {
  const { id } = useParams();
  const responseFilm = useGetFilmQuery(id);
  const responseSequelAndPrequels = useGetSequelAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

  const navigate = useNavigate();

  if (
    responseFilm.isLoading ||
    responseSequelAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (responseFilm.isError || responseStaff.isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid container mb={2} mt={2} spacing={2}>
        <Grid item size={4}>
          <img
            src={responseFilm.data.posterUrl}
            alt={responseFilm.data.nameRu}
            width="100%"
          />
        </Grid>
        <Grid item size={6}>
          <Grid container>
            <Grid item size={2}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              />
            </Grid>
            <Grid item size={4} alignContent="center">
              <Typography variant="h5">{responseFilm.data.nameRu}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item size={6}>
              <Typography>Год</Typography>
            </Grid>
            <Grid item size={6}>
              <Typography gutterBottom>{responseFilm.data.year}</Typography>
            </Grid>
            <Grid item size={6}>
              <Typography>Страна</Typography>
            </Grid>
            <Grid item size={6}>
              {responseFilm.data.countries.map(({ country }) => (
                <Typography gutterBottom key={country}>
                  {country}
                </Typography>
              ))}
            </Grid>
            <Grid item size={6}>
              <Typography>Жанры</Typography>
            </Grid>
            <Grid item size={6}>
              {responseFilm.data.genres.map(({ genre }) => (
                <Typography gutterBottom key={genre}>
                  {genre}
                </Typography>
              ))}
            </Grid>
            <Grid item size={6}>
              <Typography>Режиссеры</Typography>
            </Grid>
            <Grid item size={6}>
              {responseStaff.data
                .filter((el) => el.professionText === "Режиссеры")
                .map(({ nameRu }) => (
                  <Typography gutterBottom key={nameRu}>
                    {nameRu}
                  </Typography>
                ))}
            </Grid>
            <Grid item size={6}>
              <Typography>Время</Typography>
            </Grid>
            <Grid item size={6}>
              <Typography gutterBottom>
                {responseFilm.data.filmLength} мин
              </Typography>
            </Grid>
            <Grid item size={12}>
              <Typography>Описание</Typography>
            </Grid>
            <Grid item size={12}>
              <Typography gutterBottom>
                {responseFilm.data.description
                  ? responseFilm.data.description
                  : "Описание отсутствует...."}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={2}>
          <Grid item size={4}>
            <Typography variant="h6" gutterBottom>
              Актеры
            </Typography>
          </Grid>
          <Grid item size={8}>
            {responseStaff.data
              .filter((el) => el.professionText === "Актеры")
              .slice(0, 10)
              .map(({ nameRu }) => (
                <Typography gutterBottom key={nameRu}>
                  {nameRu}
                </Typography>
              ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        margin="auto"
      >
        <Grid item size={12}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              target="_blank"
              href={responseFilm.data.webUrl}
              endIcon={<Language />}
            >
              Кинопоиск
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`}
              endIcon={<Language />}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item size={12}>
          <Typography textAlign="center" variant="h5">
            Смотреть онлайн
          </Typography>
          <video />
        </Grid>
      </Grid>

      <Stack>
        <Typography variant="h4">Сиквелы и приквелы</Typography>

        {responseSequelAndPrequels?.data?.length > 0 ? (
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {responseSequelAndPrequels.data.map((el) => (
              <MoviesCard
                key={el.filmId}
                movie={{ ...el, kinopoiskId: el.filmId }}
              />
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">
            Нет данных о сиквелах или приквелах.
          </Typography>
        )}
      </Stack>
    </>
  );
}
