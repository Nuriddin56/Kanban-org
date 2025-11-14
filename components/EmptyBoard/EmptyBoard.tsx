import styles from "./Board.module.css";

interface EmptyBoardProps {
  type?: "add" | "edit";
}

export default function EmptyBoard({ type = "add" }: EmptyBoardProps) {
  return (
    <div className={styles.emptyBoard}>
      <h2>
        {type === "add"
          ? "No boards yet. Add your first board!"
          : "This board is empty."}
      </h2>
      <p>
        {type === "add"
          ? "Click the button below to create your first board."
          : "Start adding tasks to your board."}
      </p>
    </div>
  );
}
