import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import CompletedTasks from "./Compoenets/CompletedTask.jsx";
import InboxTask from "./Compoenets/InboxTask.jsx";
import TodayTasks from "./Compoenets/TodayTask.jsx";
import UpcomingTasks from "./Compoenets/UpcomingTask.jsx";
import Login from "./Compoenets/Login.jsx";
import Addtask from "./Compoenets/Addtask.jsx";
const root = document.getElementById("root");

let route = createBrowserRouter([
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
    path: "/Login",
    element: <Login />,
  },
]);

createRoot(root).render(<RouterProvider router={route}></RouterProvider>);
