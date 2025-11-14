"use client";

import { useState, DragEvent } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../Modals/TaskModal";
import styles from "./Column&Task.module.css";

interface TaskProps {
  taskIndex: number;
  colIndex: number;
}

export default function Task({ taskIndex, colIndex }: TaskProps) {
  const boards = useSelector((state: any) => state.boards);
  const board = boards.find((board: any) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((c: any, i: number) => i === colIndex);
  const task = col.tasks.find((t: any, i: number) => i === taskIndex);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const completed = task.subtasks.filter((s: any) => s.isCompleted).length;

  const handleOnDrag = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        draggable
        onDragStart={handleOnDrag}
        className={styles.task}
        onClick={() => setIsTaskModalOpen(true)}
      >
        <p className={`${styles["task-title"]} heading-M`}>{task.title}</p>
        <p className={`${styles["num-of-subtasks"]} text-M`}>
          {completed} of {task.subtasks.length} subtasks
        </p>
      </div>

      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}
