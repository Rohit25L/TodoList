import React, { useState } from "react";
import { Plus, Circle } from "lucide-react";
import TaskCard from "./TaskCard";
import { useOutletContext } from "react-router";
import Updatein from "./Updatein";

export default function InboxTask() {
  const { saveTask, deleteId, updateId, setTasks, updateDa, UpdateData ,setGetData } =
    useOutletContext();
  const [updateUi, setUpdateUi] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inbox</h1>
      <ul className="space-y-4">
        {saveTask.map((saveTask, index) => (
          <TaskCard
            key={saveTask._id}
            indexId={index}
            saveTask={saveTask}
            id={saveTask._id}
            OnDelete={deleteId}
            updateId={updateId}
            setUpdateUi={setUpdateUi}
            UpdateData={UpdateData}
            setGetData={setGetData}
          />
        ))}
        {updateUi && (
          <Updatein
            setTasks={setTasks}
            onCancel={setUpdateUi}
            updateData={updateDa}
            UpdateData={UpdateData}
            setGetData={setGetData}
          />
        )}
      </ul>
    </div>
  );
}
