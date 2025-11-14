import React from "react";

interface DeleteModalProps {
  type: "task" | "board";
  title: string;
  onDeleteBtnClick: () => void;
}

export default function DeleteModal({
  type,
  title,
  onDeleteBtnClick,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-11/12 max-w-md text-center">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Delete this {type}?
        </h3>

        <p className="text-gray-500 dark:text-gray-300 mb-8">
          {type === "task"
            ? `Are you sure you want to delete the "${title}" task and its subtasks? This action cannot be reversed.`
            : `Are you sure you want to delete the "${title}" board? This action will remove all columns and tasks and cannot be reversed.`}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onDeleteBtnClick}
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-6 rounded-full transition"
          >
            Delete
          </button>
          <button
            onClick={onDeleteBtnClick}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-purple-700 dark:text-purple-400 font-bold py-2 px-6 rounded-full transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
