import React, { useRef } from "react";
import SideBar from "./Compoenets/SideBarr";
import Addtask from "./Compoenets/Addtask";

import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import axios from "axios";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [activeContent, setActiveContent] = useState("Today");
  const [taskOP, setTaskOP] = useState(false);
  const [subm, setSubm] = useState(false);
  const [fetchBol, setFetchBol] = useState(false);
  const [getData, setGetData] = useState();
  const [userName ,setuserName] =useState();

  const [tasks, setTasks] = useState([]);
  const [saveTask, setSaveTask] = useState([]);
  const [updateDa, setUpdateDa] = useState();
  const id = sessionStorage.getItem("id");
  const refid = useRef();
  const useid = useRef();

  if (!id) {
    return <Navigate to="/login" />;
  }

  const desttaask = tasks[0];

  const addtotask = async () => {
    const res = await axios.post(`${window.location.origin}/api/v2/addTask`, {
      ...desttaask,
      id: id,
    });
    console.log(res, "adding to task");
  };

  useEffect(() => {
    const wait = async (params) => {
      if (tasks.length > 0) {
        // setSaveTask([...saveTask, ...tasks]);
        await addtotask();
        setFetchBol(!fetchBol);
      }
    };
    wait();
  }, [tasks]);

  useEffect(() => {
    const fetchdata = async () => {

      const res = await axios.get(`${window.location.origin}/api/v2/geTask/${id}`);
      console.log(res.data.list, "fetching data");
      if(res.data.list){
      const data = res.data.list;
      setSaveTask([...data]);
      }
    };
    fetchdata();
  }, [fetchBol, subm]);

  const deleteId = async (cardid) => {
    console.log(cardid);
    const res = await axios.delete(
      `${window.location.origin}/api/v2/deleteTask/${cardid}`,
      { data: { userid: id } }
    );
    console.log(res, "delete sres");
    const newarr = saveTask.filter(item => item._id != cardid)
    setSaveTask([...newarr])
  };

  function UpdateData(indexid, id) {
    refid.current = id;
    useid.current = indexid;
    setUpdateDa(saveTask[indexid]);
    console.log(getData);
  }

  useEffect(() => {
    const fun = async () => {
      const res = await axios.put(
        `${window.location.origin}/api/v2/updateTask/${refid.current}`,
        { ...getData }
      );
      console.log(res);

      const Updatearr = saveTask.map((v, i) => {
        if (i == useid.current) {
          return {
            ...v,
            title: getData.title,
            description: getData.description,
          };
        }
        return v;
      });
      console.log(Updatearr, "updatedarr");
      setSaveTask([...Updatearr]);
    };

    if (getData) {
      fun();
    }
  }, [getData]);

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
        saveTask={saveTask}
      />
      <main
        className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Outlet
          context={{
            saveTask,
            deleteId,
            taskOP,
            setTasks,
            setTaskOP,
            UpdateData,
            updateDa,
            setGetData,
          }}
        />
        {taskOP && <Addtask onCancel={setTaskOP} setTasks={setTasks} />}
      </main>
    </div>
  );
}
