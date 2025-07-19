import React from "react";
import SideBar from "./Compoenets/SideBarr";
import Addtask from "./Compoenets/Addtask";

import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "./Store/Store.js";
import axios from "axios";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [activeContent, setActiveContent] = useState("Today");
  const [taskOP, setTaskOP] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [saveTask, setSaveTask] = useState([]);
  const dispatch = useDispatch();
  const id = sessionStorage.getItem("id");
  if (!id) {
    return <Navigate to="/login" />;
  }
  const desttaask =tasks[0];
  console.log({ ...desttaask, id: id });

  const addtotask = async () => {
    const res = await axios.post("http://localhost:4000//api/v2/addTask");
  };

  useEffect(() => {
    if (tasks.length > 0) {
      setSaveTask([...saveTask, ...tasks]);
      // addtotask();
    }
  }, [tasks]);

  const deleteId = (id) => {
    saveTask.splice(id, 1);
    setSaveTask([...saveTask]);
    console.log("app", id);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <SideBar
        setActiveContent={setActiveContent}
        activeContent={activeContent}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        cloose={setTaskOP}
        setTaskOP={setTaskOP}
      />
      <main
        className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Outlet context={{ saveTask, deleteId, taskOP, setTasks }} />
        {taskOP && (
          <Addtask onCancel={setTaskOP} tasks={tasks} setTasks={setTasks} />
        )}
      </main>
    </div>
  );
}
