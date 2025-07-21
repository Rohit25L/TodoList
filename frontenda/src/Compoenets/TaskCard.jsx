import React, { useEffect, useState } from "react";
import { Edit2, Flag, Trash2, MoreHorizontal } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function TaskCard({
  indexId,
  saveTask,
  id,
  OnDelete,
  setCheckbut,
  setUpdateUi,
  UpdateData,
}) {
  const { title, description } = saveTask;
  const notify = () => toast("Task is completed");
  const [isChecked, setIsChecked] = useState(false);
  const userid = sessionStorage.getItem("id");

  async function fetch() {
    console.log("startted");
    try {
      console.log("sending request", { id: id, title: title });
      const res = await axios.post("http://localhost:4000/api/v3/completed", {
        id: userid,
        title: title,
      });
      console.log(res);
      if (res.status == 200) {
        OnDelete(id);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("done functionn call");
  }

  const handleCheckboxChange = async (event) => {
    const newStatus = event.target.checked;
    if (newStatus === true) {
      fetch();
      setIsChecked(true);
      toast.success("Yay! Task completed!");
    }
  };

  function handelUpdate() {
    setUpdateUi(true);
    UpdateData(indexId, id);
  }

  return (
    <li className="flex items-start justify-between py-2 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start flex-1 min-w-0">
        <input
          type="checkbox"
          className="w-4 h-4 mr-3 mt-1 flex-shrink-0 border-2"
          onChange={handleCheckboxChange}
          disabled={isChecked}
          style={{ cursor: isChecked ? "not-allowed" : "pointer" }}
        ></input>
        <div className="flex flex-col min-w-0 flex-grow">
          <span className={`text-gray-800 font-medium truncate`}>{title}</span>
          {description && (
            <span className={`text-gray-600 text-sm truncate`}>
              {description}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
        <button
          className="p-1 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-md"
          aria-label="Edit task"
          onClick={handelUpdate}
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
