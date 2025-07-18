import React from "react";
import { Plus, Circle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";

export default function TodayTasks() {
  const { saveTask ,deleteId} = useOutletContext();
  console.log(saveTask,"today task")
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Today</h1>
      <p className="text-gray-600">3 tasks</p>
      <ul className="mt-4 space-y-4">
        {saveTask.length > 0 ? (
          saveTask.map((saveTask, index) => (
            <TaskCard saveTask={saveTask} id={index} OnDelete={deleteId}/>
          ))
        ) : (
          <li className="text-gray-500 italic">No tasks for today.</li>
        )}
      </ul>
      <button className="mt-6 flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
        <Plus size={18} className="mr-2" />
        Add task
      </button>
    </div>
  );
}
