"use client";

import styles from "./Board.module.css";

interface ElipsisMenuProps {
  type: string;
  setOpenEditModal: () => void;
  setOpenDeleteModal: () => void;
}

export default function ElipsisMenu({
  type,
  setOpenEditModal,
  setOpenDeleteModal,
}: ElipsisMenuProps) {
  return (
    <div className={styles["elipsis-menu"]}>
      <p onClick={() => setOpenEditModal()} className={styles.option}>
        Edit {type}
      </p>
      <p
        onClick={() => setOpenDeleteModal()}
        className={`${styles.option} ${styles["elipsis-menu-red"]}`}
      >
        Delete {type}
      </p>
    </div>
  );
}
