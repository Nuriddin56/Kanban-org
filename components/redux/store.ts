import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./slice/boardsSlice";
import themeSlice from "./slice/themeSlice";

const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
