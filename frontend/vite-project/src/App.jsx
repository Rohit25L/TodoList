import React from "react";
import SideBar from "./Compoenets/SideBarr";
import CompletedTask from "./Compoenets/CompletedTask";
import UpcomingTasks from "./Compoenets/UpcomingTask";
import InboxTasks from "./Compoenets/InboxTask";
import TodayTasks from "./Compoenets/TodayTask";
import Addtask from "./Compoenets/Addtask";

import { useState, useEffect } from "react";
import { Outlet } from "react-router";

export default function App() {
  // Initialize based on screen size: open on large (md and up), closed on small
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [activeContent, setActiveContent] = useState("Today");
  const [taskOP, setTaskOP] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [saveTask , setSaveTask] = useState([])

  useEffect(()=>{
    if(tasks.length>0){
    setSaveTask([...saveTask,...tasks])}
  },[tasks])

  const deleteId =(id)=>{
    console.log("app",id)
  }


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
        <Outlet context={{ saveTask,deleteId }} />
        {taskOP && (
          <Addtask onCancel={setTaskOP} tasks={tasks} setTasks={setTasks} />
        )}
      </main>
    </div>
  );
}
