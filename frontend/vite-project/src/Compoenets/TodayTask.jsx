import React, { useState } from "react";
import { Plus, Circle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";

import Addtask from "./Addtask";
import Updatein from "./Updatein";

export default function TodayTasks() {
  const { saveTask, deleteId, taskOP, setTasks } = useOutletContext();
  const [updateUi, setUpdateUi] = useState(false);
  const [checkbut, setCheckbut] = useState();
  const [updateinput, setUpdateinput ] = useState(false)

  function handelAddinline() {
    setUpdateUi(true)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Today</h1>
      {saveTask.length > 0 && (
        <p className="text-gray-600">{saveTask.length} tasks</p>
      )}
      <ul className="mt-4 space-y-4 pb-6">
        {saveTask.length > 0 ? (
          saveTask.map((saveTask, index) => (
              <TaskCard
                saveTask={saveTask}
                id={index}
                OnDelete={deleteId}
                setUpdateUi={setUpdateUi}
              />))
        ) : (
          <li className="text-gray-500 italic">No tasks for today.</li>
        )}
      </ul>

      {updateUi ? (
        <Updatein setTasks={setTasks} onCancel={setUpdateUi} />
      ) : (
        <button
          className="mt-6 flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
          onClick={handelAddinline}
        >
          <Plus size={18} className="mr-2" />
          Add task
        </button>
      )}
    </div>
  );
}
