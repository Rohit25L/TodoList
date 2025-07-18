import React from "react";
import { Edit2, Flag, Trash2, MoreHorizontal } from "lucide-react";

export default function TaskCard({ saveTask, id , OnDelete}) {
  const { taskName, desc  } = saveTask;
  const isCompleted = status === "completed";

  return (
    <li className="flex items-start justify-between py-2 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start flex-1 min-w-0">
        <span
          className={`w-4 h-4 rounded-full border-2 mr-3 mt-1 flex-shrink-0 ${
            isCompleted ? "bg-green-500 border-green-500" : "border-orange-400"
          }`}
          aria-label={isCompleted ? "Completed task" : "Pending task"}
        >
          {isCompleted && (
            <svg
              className="w-full h-full text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          )}
        </span>
        <div className="flex flex-col min-w-0 flex-grow">
          <span
            className={`text-gray-800 font-medium truncate ${
              isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {taskName}
          </span>
          {desc && (
            <span
              className={`text-gray-600 text-sm truncate ${
                isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {desc}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
        <button
          className="p-1 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-md"
          aria-label="Edit task"
        >
          <Edit2 size={16} />
        </button>
        <button
          className="p-1 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-md"
          aria-label="Set priority"
        >
          <Flag size={16} />
        </button>
        <button
          className="p-1 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-md"
          aria-label="Delete task"
          onClick={() => OnDelete(id)}
        >
          <Trash2 size={16} />
        </button>
        <button
          className="p-1 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-md"
          aria-label="More options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </li>
  );
}
