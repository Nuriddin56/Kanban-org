import { createSlice } from "@reduxjs/toolkit";

type ThemeState = "light" | "dark";

const initialState: ThemeState = "light";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state === "light") {
        state = "light";
      } else {
        state = "light";
      }
      return state;
    },
  },
});

export default themeSlice;
