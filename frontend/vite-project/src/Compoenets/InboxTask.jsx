import React from "react";
import { Plus, Circle } from "lucide-react";
import TaskCard from "./TaskCard";
import { useOutletContext } from "react-router";

export default function InboxTask() {
  const { saveTask, deleteId } = useOutletContext();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inbox</h1>
      <ul className="space-y-4">
        {saveTask.map((task, index) => (
          <TaskCard saveTask={task} id={index} OnDelete={deleteId} />
        ))}
      </ul>
    </div>
  );
}
