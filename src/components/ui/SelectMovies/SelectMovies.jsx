import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import { useGetGenreAndCountriesQuery } from "../../../services/kinopoiskAPI";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MoviesSkeleton from "../../pages/MoviesPage/MoviesSkeleton";

export default function SelectMovies({ countries, order, year, genreId }) {
  const { data, error, isLoading } = useGetGenreAndCountriesQuery();
  console.log(data);
  if (error) return <ErrorMessage />;
  if (isLoading) return <MoviesSkeleton />;

  const orderList = [
    { title: "По рейтингу ", value: "RATING" },
    { title: "По оценкам", value: "NUM_VOTE" },
  ];

  const yearList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  return (
    <>
      <Stack sx={{ flexDirection: { sm: "column", md: "row" }, mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
          <Select label="Orders">
            {orderList.map((order) => (
              <MenuItem key={order.value} value={order.value}>
                {order.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Страна</InputLabel>
          <Select label="Countries">
            {data?.countries.map((country) => (
              <MenuItem key={country.id}>{country.country}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Жанр</InputLabel>
          <Select label="Genres">
            {data?.genres.map((genres) => (
              <MenuItem key={genres.id}>{genres.genre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Год</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            {yearList.map((year) => (
              <MenuItem key={year.value} value={year.value}>
                {year.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Button variant="outlined">Сбросить</Button>
        </Box>
      </Stack>
    </>
  );
}
