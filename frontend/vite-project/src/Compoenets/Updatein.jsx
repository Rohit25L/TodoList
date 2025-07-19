import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Flag,
  Bell,
  MoreHorizontal,
  ChevronDown,
  Inbox,
  Plus,
} from "lucide-react";

export default function Updatein({ onAddTask, onCancel, setTasks, tasks }) {
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [final, setFinal] = useState([]);
  const descriptionRef = useRef(null);

  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 150,
  });

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height =
        descriptionRef.current.scrollHeight + "px";
    }
  }, [desc]);

  useEffect(() => {
    console.log("Current final state:", final);
    setTasks(final);
  }, [final]);

  const handleAddTask = () => {
    setFinal([{ taskName, desc }]);
    setTimeout(() => {
      onCancel(false);
    }, 200);
  };

  return (
    <div
      className="fixed bg-white rounded-lg shadow-xl w-full max-w-md p-4 mb-4"
      style={{
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
    >
      <div className="pb-2">
        <input
          type="text"
          placeholder="Task name"
          className="w-full text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-2 focus:outline-none"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        {/* Description Input */}
        <textarea
          ref={descriptionRef}
          placeholder="Description"
          className="w-full text-sm text-gray-600 resize-none border-b border-gray-200 pb-2 focus:outline-none"
          rows="2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>

      <div className="py-2 flex items-center space-x-2 border-b border-gray-200">
        <button className="flex items-center px-3 py-1.5 text-gray-600 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition-colors">
          <Calendar size={16} className="mr-1" /> Date
        </button>
        <button className="flex items-center px-3 py-1.5 text-gray-600 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition-colors">
          <Flag size={16} className="mr-1" /> Priority
        </button>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <div className="flex items-center text-gray-600 text-sm">
          <Inbox size={16} className="mr-1 text-blue-600" />
          <span className="font-medium">Inbox</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onCancel(false)}
            className="px-4 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          {taskName.trim() == "" ? (
            <button className="px-4 py-2 bg-red-300 text-white text-sm font-medium rounded-md">
              Add task
            </button>
          ) : (
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
            >
              Add task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
