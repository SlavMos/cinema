import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetFilmQuery,
  useGetSequelAndPrequelsQuery,
  useGetStaffQuery,
} from "../../../services/kinopoiskAPI";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import { ArrowBack, NavigateBeforeSharp } from "@mui/icons-material";

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
    <Grid container spacing={2}>
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
              <Typography key={genre}>{genre}</Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item size={2}>
        Actors
      </Grid>
    </Grid>
  );
}
