import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Plus,
  Search,
  Inbox,
  Calendar,
  Clock,
  Filter,
  CheckCircle,
  Home,
  HelpCircle,
  Bell,
  Menu,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Store } from "../Store/Store";
import { logout } from "../Store/Store";

export default function SideBar({
  activeContent,
  setActiveContent,
  isSidebarOpen,
  toggleSidebar,
  cloose,
  setTaskOP,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = "Rohit";
  const dropdownRef = useRef(null);
  const handleLogout = () => {
    console.log("Logging out...");
    logout()
    setIsDropdownOpen(false);
  };

  const isLoggedIn = useSelector((State)=>State.isLoggdIn)
  console.log(isLoggedIn)
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4 flex flex-col transition-transform duration-300 ease-in-out z-50 md:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className="pb-4 border-b border-gray-200 relative"
          ref={dropdownRef}
        >
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center w-full justify-between p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-800 font-semibold text-base">
                {username}
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>


          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
              >
                <LogOut size={18} className="mr-3 text-gray-500" />
                Log out
              </button>
            </div>
          )}
        </div>

        <nav className="flex-1 mt-4 space-y-1">
          <button
            className="flex items-center w-full px-3 py-2 text-blue-600 font-medium bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
            onClick={() => setTaskOP(true)}
          >
            <Plus size={20} className="mr-2" />
            Add task
          </button>

          <div className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
            <Search size={20} className="mr-2 text-gray-500" />
            Search
          </div>

          <Link to="/Inboxtask">
            {" "}
            <div
              className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
                activeContent === "Inbox"
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveContent("Inbox")}
            >
              <div className="flex items-center">
                <Inbox size={20} className="mr-2 text-blue-600" />
                Inbox
              </div>
              <span className="text-gray-500 text-xs font-semibold px-2 py-0.5 bg-gray-200 rounded-full">
                4
              </span>
            </div>{" "}
          </Link>

          <Link to="/">
            <div
              className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
                activeContent === "Today"
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveContent("Today")}
            >
              <div className="flex items-center">
                <Calendar size={20} className="mr-2 text-green-600" />
                Today
              </div>
              <span className="text-white text-xs font-semibold px-2 py-0.5 bg-red-500 rounded-full">
                3
              </span>
            </div>
          </Link>

          <Link to="/UpcomingTasks">
            {" "}
            <div
              className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
                activeContent === "Upcoming"
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveContent("Upcoming")}
            >
              <div className="flex items-center">
                <Clock size={20} className="mr-2 text-purple-600" />
                Upcoming
              </div>
              <span className="text-gray-500 text-xs font-semibold px-2 py-0.5 bg-gray-200 rounded-full">
                3
              </span>
            </div>
          </Link>
        </nav>

        <Link to="/completedtask">
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div
              className={`flex items-center justify-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
                activeContent === "Completed"
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveContent("Completed")}
            >
              <CheckCircle size={20} className="mr-2 text-gray-500" />
              Completed
            </div>
          </div>
        </Link>
      </aside>
    </>
  );
}
