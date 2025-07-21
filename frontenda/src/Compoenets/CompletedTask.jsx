import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";

export default function CompletedTasks() {
  const id = sessionStorage.getItem("id");
  const [completedData, setCompletedData] = useState();

  useEffect(() => {
    const fun = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/v3/getcompleted/${id}`
      );
      console.log(res);
      if (res.status == 200) {
        setCompletedData(res.data.list);
      }
    };
    fun();
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Activity: All projects
        </h1>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-200">
            Everyone
          </button>
          <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-200">
            Completed tasks
          </button>
          <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-200">
            Send feedback
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {completedData && completedData.map((task, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 py-2 border-b border-gray-200 last:border-b-0"
            >
              <CheckCircle2 size={20} className="text-green-500 mt-1" />
              <div className="flex-1">
                <p className="text-gray-800">
                  - You completed a task:{" "}
                  <span className="underline">{task.title}</span>
                </p>
              </div>
              <span className="text-gray-500 text-sm">Good job</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}
