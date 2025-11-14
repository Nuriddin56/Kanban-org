import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../../assets/icon-cross.svg";
import styles from "../../components/Modals/BoardModals.module.css";

interface ColumnType {
  id: string;
  name: string;
  tasks: any[];
}

interface AddEditBoardModalProps {
  type: "add" | "edit";
  setIsBoardModalOpen: (state: boolean) => void;
}

export default function AddEditBoardModal({
  type,
  setIsBoardModalOpen,
}: AddEditBoardModalProps) {
  const boards = useSelector((state: any) => state.boards);
  const board = boards.find((b: any) => b.isActive);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState<ColumnType[]>([
    { id: uuidv4(), name: "Todo", tasks: [] },
    { id: uuidv4(), name: "Doing", tasks: [] },
  ]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (type === "edit" && isFirstLoad && board) {
      setName(board.name);
      setNewColumns(
        board.columns.map((col: any) => ({ ...col, id: uuidv4() }))
      );
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, board]);

  const validate = () => {
    if (!name.trim()) {
      setIsValid(false);
      return false;
    }
    for (let col of newColumns) {
      if (!col.name.trim()) return false;
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id: string, newValue: string) => {
    setNewColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, name: newValue } : col))
    );
  };

  const onDelete = (id: string) => {
    setNewColumns((prev) => prev.filter((col) => col.id !== id));
  };

  const onSubmit = () => {
    setIsBoardModalOpen(false);
  };

  return (
    <div
      className={styles.modalContainer + " dimmed"}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setIsBoardModalOpen(false);
      }}
    >
      <div className={styles.modal}>
        <h3>{type === "edit" ? "Edit" : "Add New"} Board</h3>

        <label htmlFor="board-name-input">Board Name</label>
        <div className={styles.inputContainer}>
          <input
            id="board-name-input"
            type="text"
            placeholder="e.g. Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={!isValid && !name.trim() ? styles.redBorder : ""}
          />
          {!isValid && !name.trim() && (
            <span className={styles.cantBeEmpty}>Can't be empty</span>
          )}
        </div>

        <label>Board Columns</label>
        <div className={styles.modalColumns}>
          {newColumns.map((col) => (
            <div className={styles.modalColumn} key={col.id}>
              <div className={styles.inputContainer}>
                <input
                  value={col.name}
                  onChange={(e) => onChange(col.id, e.target.value)}
                  className={
                    !isValid && !col.name.trim() ? styles.redBorder : ""
                  }
                />
                {!isValid && !col.name.trim() && (
                  <span className={styles.cantBeEmpty}>Can't be empty</span>
                )}
              </div>
              <img
                src={crossIcon}
                alt="delete-column-icon"
                onClick={() => onDelete(col.id)}
              />
            </div>
          ))}
        </div>

        <button
          className={styles.addColumnBtn + " btn-light"}
          onClick={() =>
            setNewColumns((prev) => [
              ...prev,
              { id: uuidv4(), name: "", tasks: [] },
            ])
          }
        >
          + Add New Column
        </button>

        <button className={styles.createBtn} onClick={onSubmit}>
          {type === "add" ? "Create New Board" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
