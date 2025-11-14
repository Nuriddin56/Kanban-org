"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import boardIcon from "@/assets/icon-board.svg";
import darkIcon from "@/assets/icon-dark-theme.svg";
import lightIcon from "@/assets/icon-light-theme.svg";

import styles from "./HeaderDropdown.module.css";

interface HeaderDropdownProps {
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
  setIsBoardModalOpen: Dispatch<SetStateAction<boolean>>;
  boards: { name: string; isActive?: boolean }[];
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function HeaderDropdown({
  setOpenDropdown,
  setIsBoardModalOpen,
  boards,
  theme,
  toggleTheme,
}: HeaderDropdownProps) {
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    setOpenDropdown(false);
  };

  return (
    <div
      className={styles["dropdown-container"]}
      onClick={handleContainerClick}
    >
      <div className={styles["dropdown-modal"]}>
        <h3>ALL BOARDS ({boards.length})</h3>
        <div className={styles["dropdown-boards"]}>
          {boards.map((board, index) => (
            <div
              key={index}
              className={`${styles["dropdown-board"]} ${
                board.isActive ? styles["board-active"] : ""
              }`}
              onClick={() => setOpenDropdown(false)}
            >
              <Image
                className={styles["filter-white"]}
                src={boardIcon}
                alt="board"
              />{" "}
              {board.name}
            </div>
          ))}

          <div
            className={`${styles["dropdown-board"]} ${styles["dropdown-create-board-btn"]}`}
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown((state) => !state);
            }}
          >
            <Image
              className={styles["filter-purple"]}
              src={boardIcon}
              alt="board"
            />{" "}
            + Create New Board
          </div>
        </div>

        <div className={styles["theme-toggle"]}>
          <Image src={lightIcon} alt="sun indicating light mode" />
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={theme === "light"}
              onChange={toggleTheme}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <Image src={darkIcon} alt="moon indicating dark mode" />
        </div>
      </div>
    </div>
  );
}
