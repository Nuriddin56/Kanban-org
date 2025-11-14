import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubtaskPayload {
  index: number;
  taskIndex: number;
  colIndex: number;
}

const boardsSlice = createSlice({
  name: "boards",
  initialState: [] as any[],
  reducers: {
    setSubtaskCompleted: (state, action: PayloadAction<SubtaskPayload>) => {
      const { colIndex, taskIndex, index } = action.payload;
      const board = state.find((b: any) => b.isActive);
      if (!board) return;
      const col = board.columns[colIndex];
      if (!col) return;
      const task = col.tasks[taskIndex];
      if (!task) return;
      const subtask = task.subtasks[index];
      if (!subtask) return;

      subtask.isCompleted = !subtask.isCompleted;
    },
  },
});

export const { setSubtaskCompleted } = boardsSlice.actions;
export default boardsSlice;
