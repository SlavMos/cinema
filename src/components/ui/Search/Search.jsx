/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetFilmsByKeywordQuery } from "../../../services/kinopoiskAPI";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../features/searchQuerySlice";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { page, keyword } = useSelector((state) => state.searchQuerySlice);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input, page: 1 })); // <--- сбрасываем страницу
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const { data, isFetching } = useGetFilmsByKeywordQuery({ keyword, page });

  return (
    <Autocomplete
      freeSolo
      sx={{ width: 300, backgroundColor: "rgba(255,255,255,0.15)" }}
      options={data?.films?.filter((film) => !!film.nameRu) || []} // ⬅️ массив объектов
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.nameRu || ""
      }
      isOptionEqualToValue={(option, value) =>
        (option.filmId || option.kinopoiskId) ===
        (value.filmId || value.kinopoiskId)
      }
      onInputChange={(_, value) => {
        setInput(value);
      }}
      onChange={(_, selectedFilm) => {
        if (selectedFilm && (selectedFilm.filmId || selectedFilm.kinopoiskId)) {
          const id = selectedFilm.filmId || selectedFilm.kinopoiskId;
          navigate(`/movie/${id}`);
          console.log("✅ выбран фильм:", selectedFilm);
        } else {
          console.warn("⚠️ выбрана строка, filmId нет", selectedFilm);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск фильмов"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
