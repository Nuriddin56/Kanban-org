export interface Board {
  name: string;
  isActive: boolean;
  columns: Column[];
}

export interface Column {
  name: string;
  tasks: Task[];
  id: string;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
  id: string;
}
