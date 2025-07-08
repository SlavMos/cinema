import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: "",
  gengreId: "",
  order: "",
  type: "",
  year: "",
  page: 1,
};

export const currentQuerySlice = createSlice({
  name: "currentQuerySlice",
  initialState,
  reducers: {},
});

export default currentQuerySlice.reducer;
