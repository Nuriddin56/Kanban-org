"use client";

import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import EmptyBoard from "../components/EmptyBoard/EmptyBoard";
import { useSelector } from "react-redux";

export default function Page() {
  const boards = useSelector((state: any) => state.boards);
  const theme = useSelector((state: any) => state.theme);

  const activeBoard = boards.find((board: any) => board.isActive);

  return (
    <div className={`app ${theme}`}>
      {boards.length > 0 ? (
        <>
          <Header />
          <Board />
        </>
      ) : (
        <EmptyBoard />
      )}
    </div>
  );
}
