import React from 'react';
import { Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
// import TaskItem from './TaskItem'; // Import TaskItem
import TaskCard from './TaskCard';

 function UpcomingTasks() {
  const { saveTask } = useOutletContext(); // Get saveTask from Outlet context

  // Function to generate dates for the current week dynamically
  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startDate = new Date(today);

    startDate.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates();

  // Filter saveTask that are pending and have a future or today's date
  const upcomingTasks = saveTask.filter(task => {
    const taskDate = new Date(task.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    return task.status === 'pending' && taskDate >= today;
  }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

  // Group saveTask by date for display
  const groupedTasks = upcomingTasks.reduce((acc, task) => {
    const dateKey = new Date(task.date).toDateString(); // e.g., "Fri Jul 18 2025"
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        saveTask: [],
      };
    }
    acc[dateKey].saveTask.push(task);
    return acc;
  }, {});

  const sortedGroupedDates = Object.keys(groupedTasks).sort((a, b) => new Date(a) - new Date(b));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Upcoming</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600 font-medium">

            <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            <ChevronDown size={18} className="ml-1 cursor-pointer" />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md hover:bg-gray-200">
              <ChevronLeft size={20} />
            </button>
            <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-200">
              Today
            </button>
            <button className="p-2 rounded-md hover:bg-gray-200">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>


      <div className="flex justify-between items-center text-sm text-gray-500 mb-6 border-b border-gray-200 pb-2">
        {weekDates.map((date) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayOfMonth = date.getDate();

          return (
            <div
              key={date.toISOString()} // Use ISO string as a unique key
              className={`flex flex-col items-center p-2 ${isToday ? 'text-red-500 font-bold' : ''}`}
            >
              <span>{dayOfWeek}</span>
              <span
                className={`text-lg ${isToday ? 'bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center' : ''}`}
              >
                {dayOfMonth}
              </span>
            </div>
          );
        })}
      </div>


      <div className="space-y-8">
        {sortedGroupedDates.length > 0 ? (
          sortedGroupedDates.map((dateKey) => {
            const section = groupedTasks[dateKey];
            const displayDate = new Date(dateKey).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const isToday = new Date(dateKey).toDateString() === new Date().toDateString();

            return (
              <div key={dateKey}>
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {displayDate}
                  {isToday && <span className="ml-2 text-red-500 text-sm">(Today)</span>}
                </h2>
                <ul className="space-y-4">
                  {section.saveTask.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  <button className="mt-2 flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                    <Plus size={18} className="mr-2" />
                    Add task
                  </button>
                </ul>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic">No upcoming saveTask.</p>
        )}
      </div>
    </div>
  );
}


export default UpcomingTasks;
