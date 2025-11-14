import React, { useState } from "react";
import styles from "../Modals/TaskModal.module.css";

export default function TaskModal({ setIsTaskModalOpen }: any) {
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const onClose = (e: any) => {
    if (e.target !== e.currentTarget) return;
    setIsTaskModalOpen(false);
  };

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`${styles.modalOverlay} ${
        !isDeleteModalOpen ? styles.dimmed : ""
      }`}
      onClick={onClose}
    >
      <div
        className={`${styles.modalContent} ${
          isDeleteModalOpen ? styles.hidden : ""
        }`}
      >
        <div className={styles.header}>
          <p className={styles.title}>Task Title</p>
          <button onClick={() => setIsElipsisMenuOpen(!isElipsisMenuOpen)}>
            Options
          </button>
        </div>

        <p className={styles.description}>Task Description</p>

        <p className={styles.subtasksTitle}>Subtasks (0 of 0)</p>
        <div className={styles.subtasksContainer}>No subtasks</div>

        <div className={styles.statusContainer}>
          <label className={styles.statusLabel}>Current Status</label>
          <select className={styles.statusSelect}>
            <option>Todo</option>
          </select>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.deleteModal}>
            <h3 className={styles.deleteTitle}>Delete this task?</h3>
            <p className={styles.deleteDesc}>This action cannot be reversed.</p>
            <div className={styles.deleteBtns}>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddTaskModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.editModal}>
            <h3 className={styles.editTitle}>Edit Task</h3>
            <p className={styles.editDesc}>Edit form here</p>
            <button
              onClick={() => setIsAddTaskModalOpen(false)}
              className={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
