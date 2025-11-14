"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";

import styles from "./Sidebar.module.css";

import showSidebarIcon from "@/assets/icon-show-sidebar.svg";
import hideSidebarIcon from "@/assets/icon-hide-sidebar.svg";

import AddEditBoardModal from "../Modals/AddEditBoardModal";

interface HeaderDropdownProps {
  setIsBoardModalOpen: Dispatch<SetStateAction<boolean>>;
  boards?: { name: string; isActive?: boolean }[];
  theme?: "light" | "dark";
  toggleTheme?: () => void;
}

function HeaderDropdown({
  setIsBoardModalOpen,
  boards = [{ name: "Example Board", isActive: true }],
  theme = "light",
  toggleTheme = () => {},
}: HeaderDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className={styles["dropdown-container"]}>
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
              {board.name}
            </div>
          ))}
          <div
            className={`${styles["dropdown-board"]} ${styles["dropdown-create-board-btn"]}`}
            onClick={() => setIsBoardModalOpen(true)}
          >
            + Create New Board
          </div>
        </div>
        <div className={styles["theme-toggle"]}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={theme === "light"}
              onChange={toggleTheme}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  isSideBarOpen,
  setIsSideBarOpen,
}: SidebarProps) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div
      className={`${styles.sidebar} 
      ${!isSideBarOpen ? styles["sidebar-closed"] : ""} 
      ${isBoardModalOpen ? styles["sidebar-infront"] : ""}`}
    >
      {isSideBarOpen && (
        <HeaderDropdown setIsBoardModalOpen={setIsBoardModalOpen} />
      )}

      <div
        className={`${styles["toggle-sidebar-container"]} ${
          !isSideBarOpen ? styles["toggle-closed"] : ""
        }`}
        onClick={toggleSidebar}
      >
        <Image
          src={isSideBarOpen ? hideSidebarIcon : showSidebarIcon}
          alt="show/hide sidebar icon"
        />
        {isSideBarOpen && <p className="heading-M">Hide Sidebar</p>}
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
