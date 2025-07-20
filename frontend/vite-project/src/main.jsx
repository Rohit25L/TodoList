import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CompletedTasks from "./Compoenets/CompletedTask.jsx";
import InboxTask from "./Compoenets/InboxTask.jsx";
import TodayTasks from "./Compoenets/TodayTask.jsx";
import UpcomingTasks from "./Compoenets/UpcomingTask.jsx";
import Login from "./Compoenets/Login.jsx";
import Addtask from "./Compoenets/Addtask.jsx";
import { Toaster } from 'react-hot-toast';
const root = document.getElementById("root");
const id = sessionStorage.getItem("id");

let route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/completedtask",
        element: <CompletedTasks />,
      },
      {
        path: "/Inboxtask",
        element: <InboxTask />,
      },
      {
        path: "/",
        element: <TodayTasks />,
      },
      {
        path: "/UpcomingTasks",
        element: <UpcomingTasks />,
      },
      {
        path: "/addtask",
        element: <Addtask></Addtask>,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Page Not Found</div>,
  },
]);

createRoot(root).render(
  <React.StrictMode>
      <RouterProvider router={route} />
  </React.StrictMode>
);
