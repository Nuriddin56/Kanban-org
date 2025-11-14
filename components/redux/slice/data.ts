export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  id?: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  isActive: boolean;
  columns: Column[];
}

export const boards: Board[] = [
  {
    name: "Example Board",
    isActive: true,
    columns: [
      {
        name: "Todo",
        tasks: [
          {
            title: "Example Task",
            description: "This is a task",
            status: "Todo",
            subtasks: [{ id: "1", title: "Subtask 1", isCompleted: false }],
          },
        ],
      },
      { name: "Doing", tasks: [] },
      { name: "Done", tasks: [] },
    ],
  },
];
