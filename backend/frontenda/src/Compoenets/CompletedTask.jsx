import React from "react";
import { CheckCircle2 } from "lucide-react"; 

export default function CompletedTasks() {

  const completedData = [
    {
      id: 1,
      date: "17 Jul - Yesterday",
      text: "Do a weekly review of my tasks and goals",
      time: "12:22",
      project: "Home",
    },
    {
      id: 2,
      date: "17 Jul - Yesterday",
      text: "Do a weekly review of my tasks and goals",
      time: "12:22",
      project: "Home",
    },
    {
      id: 3,
      date: "17 Jul - Yesterday",
      text: "Do a weekly review of my tasks and goals",
      time: "12:22",
      project: "Home",
    },
    {
      id: 4,
      date: "17 Jul - Yesterday",
      text: "Do a weekly review of my tasks and goals",
      time: "12:22",
      project: "Home",
    },
    {
      id: 5,
      date: "17 Jul - Yesterday",
      text: "Do a weekly review of my tasks and goals",
      time: "12:22",
      project: "Home",
    },
    {
      id: 6,
      date: "17 Jul - Yesterday",
      text: "Do a weekly review of my tasks and goals",
      time: "12:22",
      project: "Home",
    },
  ];

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
        {completedData.map((task, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 py-2 border-b border-gray-200 last:border-b-0"
          >
            <CheckCircle2 size={20} className="text-green-500 mt-1" />
            <div className="flex-1">
              <p className="text-gray-800">
                <span className="font-semibold">{task.date}</span> - You
                completed a task: <span className="underline">{task.text}</span>
              </p>
              <p className="text-gray-500 text-sm">{task.time}</p>
            </div>
            <span className="text-gray-500 text-sm">Home #</span>
          </div>
        ))}
      </div>
    </div>
  );
}
