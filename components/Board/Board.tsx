"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/components/redux/hooks";
import AddEditBoardModal from "../Modals/AddEditBoardModal";
import Column from "../Column/Column";
import EmptyBoard from "../EmptyBoard/EmptyBoard";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Board.module.css";

interface BoardType {
  name: string;
  isActive: boolean;
  columns: { name: string; tasks: any[] }[];
}

export default function Board() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards: BoardType[] = useAppSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);
  const columns = board?.columns || [];

  return (
    <div
      className={`${styles.board} ${
        isSideBarOpen ? styles["open-sidebar"] : ""
      }`}
    >
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          <div
            className={`${styles["add-column-column"]} heading-XL`}
            onClick={() => setIsBoardModalOpen(true)}
          >
            + New Column
          </div>
        </>
      ) : (
        <EmptyBoard />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
