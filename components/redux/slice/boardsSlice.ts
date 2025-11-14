import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boards as initialBoards, Board, Column, Task, Subtask } from "../slice/data";

const initialState: Board[] = initialBoards;

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
  },
});

export default boardsSlice;
