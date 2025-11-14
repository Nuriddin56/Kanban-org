"use client";

import { DragEvent } from "react";
import { useAppSelector } from "@/components/redux/hooks";
import Task from "../Task/Task";
import styles from "./Column&Task.module.css";

interface ColumnProps {
  colIndex: number;
}

interface TaskType {
  title: string;
  description: string;
  status: string;
  subtasks: { title: string; isCompleted: boolean; id: string }[];
}

interface ColumnType {
  name: string;
  tasks: TaskType[];
}

interface BoardType {
  name: string;
  isActive: boolean;
  columns: ColumnType[];
}

export default function Column({ colIndex }: ColumnProps) {
  const boards = useAppSelector((state) => state.boards) as BoardType[];
  const board = boards.find((b) => b.isActive);
  if (!board) return null;

  const col = board.columns[colIndex];
  if (!col) return null;

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("text");
    if (!data) return;
    try {
      const { prevColIndex, taskIndex } = JSON.parse(data) as {
        prevColIndex: number;
        taskIndex: number;
      };

      console.log(
        `Dropped task ${taskIndex} from column ${prevColIndex} to ${colIndex}`
      );
    } catch (err) {
      console.error("Invalid drag data", err);
    }
  };

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.column}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      <p className={`${styles["col-name"]} heading-S`}>
        {col.name} ({col.tasks.length})
      </p>
      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}
