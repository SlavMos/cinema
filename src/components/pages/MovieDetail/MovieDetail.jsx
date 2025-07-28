import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
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
import VideoPlayer from "../../ui/VideoPlayer/VideoPlayer";

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
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        mt={2}
        mb={2}
        alignItems="flex-start"
      >
        {/* Постер */}
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "0 0 30%" },
            width: { xs: "100%", md: "30%" },
          }}
        >
          <img
            src={responseFilm.data.posterUrl}
            alt={responseFilm.data.nameRu}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Box>

        {/* Инфа */}
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "0 0 60%" },
            width: { xs: "100%", md: "60%" },
          }}
        >
          <Stack spacing={1}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{ alignSelf: "flex-start" }}
            >
              Назад
            </Button>

            <Typography variant="h5" fontWeight="bold">
              {responseFilm.data.nameRu}
            </Typography>

            <Typography>Год: {responseFilm.data.year}</Typography>

            <Typography>
              Страна:{" "}
              {responseFilm.data.countries
                .map(({ country }) => country)
                .join(", ")}
            </Typography>

            <Typography>
              Жанры:{" "}
              {responseFilm.data.genres.map(({ genre }) => genre).join(", ")}
            </Typography>

            <Typography>
              Режиссёры:{" "}
              {responseStaff.data
                .filter((el) => el.professionText === "Режиссеры")
                .map((el) => el.nameRu)
                .join(", ")}
            </Typography>

            <Typography>Время: {responseFilm.data.filmLength} мин</Typography>

            <Typography fontWeight="bold">Описание:</Typography>
            <Typography>
              {responseFilm.data.description || "Описание отсутствует..."}
            </Typography>
          </Stack>
        </Box>

        {/* Актёры */}
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "0 0 20%" },
            width: { xs: "100%", md: "20%" },
          }}
        >
          <Typography variant="h6">Актёры:</Typography>
          <Stack spacing={0.5}>
            {responseStaff.data
              .filter((el) => el.professionText === "Актеры")
              .slice(0, 10)
              .map((el) => (
                <Typography key={el.nameRu}>{el.nameRu}</Typography>
              ))}
          </Stack>
        </Box>
      </Stack>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
        mb={4}
        gap={2}
      >
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

        <Typography variant="h5" textAlign="center">
          Смотреть онлайн
        </Typography>

        <Box>
          <VideoPlayer kpId={responseFilm.data.kinopoiskId || id} />
        </Box>
      </Box>

      <Stack alignItems="center">
        <Typography gutterBottom variant="h4">
          Сиквелы и приквелы
        </Typography>

        {responseSequelAndPrequels?.data?.length > 0 ? (
          <Stack
            sx={{ gap: 2 }}
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
          >
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
