"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/components/redux/hooks";
import Image from "next/image";

import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import ElipsisMenu from "../EllipsisMenu/EllipsisMenu";
import AddEditBoardModal from "../Modals/AddEditBoardModal";
import DeleteModal from "../Modals/DeleteModal";

import styles from "./Header.module.css";

import logoImg from "@/assets/logo-mobile.svg";
import addTaskMobileImg from "@/assets/icon-add-task-mobile.svg";
import iconDownImg from "@/assets/icon-chevron-down.svg";
import iconUpImg from "@/assets/icon-chevron-up.svg";
import elipsisImg from "@/assets/icon-vertical-ellipsis.svg";

export default function Header() {
  const boards = useAppSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [boardType, setBoardType] = useState<"add" | "edit">("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  if (!board) return null;

  const onDropdownClick = () => {
    setOpenDropdown((prev) => !prev);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  return (
    <div className={styles["header-container"]}>
      <header>
        <div className={styles["logo-container"]}>
          <Image src={logoImg} alt="logo" className={styles.logo} />
          <h3 className={styles["logo-text"]}>kanban</h3>
        </div>

        <div className={`${styles["header-name-container"]} heading-L`}>
          <h3 className={styles["header-name"]}>{board.name}</h3>
        </div>

        <button
          className={`${styles["add-task-btn"]} heading-M ${
            board.columns.length === 0 ? styles["btn-off"] : ""
          }`}
          onClick={() => setIsTaskModalOpen(true)}
          disabled={board.columns.length === 0}
        >
          + Add New Task
        </button>

        <Image
          src={elipsisImg}
          alt="menu"
          className={styles.elipsis}
          onClick={() => {
            setIsElipsisMenuOpen((prev) => !prev);
            setBoardType("edit");
          }}
        />

        {isElipsisMenuOpen && (
          <ElipsisMenu
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            type="board"
          />
        )}
      </header>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          type="board"
          title={board.name}
          onDeleteBtnClick={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isTaskModalOpen && (
        <AddEditBoardModal
          setIsBoardModalOpen={setIsTaskModalOpen}
          type="add"
        />
      )}
    </div>
  );
}
