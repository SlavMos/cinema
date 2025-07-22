import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetFilmQuery,
  useGetSequelAndPrequelsQuery,
  useGetStaffQuery,
} from "../../../services/kinopoiskAPI";
import { Box, CircularProgress, Grid } from "@mui/material";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";

export default function MovieDetail() {
  const { id } = useParams();
  const responseFilm = useGetFilmQuery(id);
  const responseSequelAndPrequels = useGetSequelAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

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
      <Grid item size={6}>
        1
      </Grid>
      <Grid item size={4}>
        2
      </Grid>
      <Grid item size={2}>
        3
      </Grid>
    </Grid>
  );
}
