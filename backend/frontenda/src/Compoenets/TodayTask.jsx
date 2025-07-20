import React, { useState } from "react";
import { Plus, Circle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";



import Addtask from "./Addtask";
import Updatein from "./Updatein";

export default function TodayTasks() {

  const { saveTask, deleteId, taskOP, setTasks ,setTaskOP, updateDa, UpdateData ,setGetData } = useOutletContext();
  const [updateUi, setUpdateUi] = useState(false);


  function handelAddinline() {
    setTaskOP(true)
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
            key={saveTask._id}
              indexId ={index}
              saveTask={saveTask}
              id={saveTask._id}
              OnDelete={deleteId}
              setUpdateUi={setUpdateUi}
              UpdateData={UpdateData}
            />
          ))
        ) : (
          <li className="text-gray-500 italic">No tasks for today.</li>
        )}
      </ul>

      {updateUi ? (
        <Updatein setTasks={setTasks} onCancel={setUpdateUi} updateData={updateDa} UpdateData={UpdateData} setGetData={setGetData}/>
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
