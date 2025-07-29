import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetFilmsByKeywordQuery } from "../../../services/kinopoiskAPI";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../features/searchQuerySlice";

export default function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { page, keyword } = useSelector((state) => state.searchQuerySlice);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input, page: 1 })); // <--- сбрасываем страницу
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const { data } = useGetFilmsByKeywordQuery({ keyword, page });

  console.log("data", data);
  return (
    <Autocomplete
      freeSolo
      sx={{ width: 300 }}
      options={
        data?.films?.map((option) => option.nameRu).filter(Boolean) || []
      }
      onInputChange={(_, value) => {
        setInput(value);
      }}
      renderInput={(params) => <TextField {...params} label="Поиск фильмов" />}
    />
  );
}
