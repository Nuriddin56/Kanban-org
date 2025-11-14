import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../../assets/icon-cross.svg";
import styles from "../../components/Modals/BoardModals.module.css";

interface SubtaskType {
  title: string;
  isCompleted: boolean;
  id: string;
}

interface ColumnType {
  name: string;
  id: string;
}

interface AddEditTaskModalProps {
  type: "add" | "edit";
  setIsTaskModalOpen?: (state: boolean) => void;
  setIsAddTaskModalOpen: (state: boolean) => void;
  taskIndex?: number;
  prevColIndex?: number;
  columns: ColumnType[];
  task?: {
    title: string;
    description: string;
    subtasks: SubtaskType[];
    status: string;
  };
}

export default function AddEditTaskModal({
  type,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex = 0,
  prevColIndex = 0,
  columns,
  task,
}: AddEditTaskModalProps) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(columns[prevColIndex]?.name || "");
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  useEffect(() => {
    if (type === "edit" && isFirstLoad && task) {
      setSubtasks(task.subtasks.map((sub) => ({ ...sub, id: uuidv4() })));
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, task]);

  const validate = () => {
    if (!title.trim()) return false;
    for (let sub of subtasks) if (!sub.title.trim()) return false;
    setIsValid(true);
    return true;
  };

  const onChangeSubtasks = (id: string, newValue: string) => {
    setSubtasks((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, title: newValue } : sub))
    );
  };

  const onDelete = (id: string) => {
    setSubtasks((prev) => prev.filter((sub) => sub.id !== id));
  };

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onSubmit = () => {
    if (!validate()) return;
    setIsAddTaskModalOpen(false);
    if (type === "edit" && setIsTaskModalOpen) setIsTaskModalOpen(false);
  };

  return (
    <div
      className={`${styles.modalContainer} ${type === "add" ? "dimmed" : ""}`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setIsAddTaskModalOpen(false);
      }}
    >
      <div className={styles.modal}>
        <h3>{type === "edit" ? "Edit" : "Add New"} Task</h3>

        <label htmlFor="task-name-input">Task Name</label>
        <div className={styles.inputContainer}>
          <input
            id="task-name-input"
            type="text"
            placeholder="e.g. Take coffee break"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={!isValid && !title.trim() ? styles.redBorder : ""}
          />
          {!isValid && !title.trim() && (
            <span className={styles.cantBeEmpty}>Can't be empty</span>
          )}
        </div>

        <label htmlFor="task-description-input">Description</label>
        <div className={styles.descriptionContainer}>
          <textarea
            id="task-description-input"
            placeholder="e.g. It's always good to take a break..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <label>Subtasks</label>
        <div className={styles.modalColumns}>
          {subtasks.map((sub) => (
            <div className={styles.modalColumn} key={sub.id}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={sub.title}
                  onChange={(e) => onChangeSubtasks(sub.id, e.target.value)}
                  className={
                    !isValid && !sub.title.trim() ? styles.redBorder : ""
                  }
                />
                {!isValid && !sub.title.trim() && (
                  <span className={styles.cantBeEmpty}>Can't be empty</span>
                )}
              </div>
              <img
                src={crossIcon}
                alt="delete-subtask"
                onClick={() => onDelete(sub.id)}
              />
            </div>
          ))}
        </div>

        <button
          className={`${styles.addColumnBtn} btn-light`}
          onClick={() =>
            setSubtasks((prev) => [
              ...prev,
              { title: "", isCompleted: false, id: uuidv4() },
            ])
          }
        >
          + Add New Subtask
        </button>

        <div className={styles.selectColumnContainer}>
          <label className="text-M">Current Status</label>
          <select
            value={status}
            onChange={onChangeStatus}
            className={styles.selectStatus}
          >
            {columns.map((c) => (
              <option key={c.id} className={styles.statusOptions}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.createBtn} onClick={onSubmit}>
          {type === "add" ? "Create Task" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
