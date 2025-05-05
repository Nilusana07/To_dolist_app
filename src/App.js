import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState("");
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (time.trim() === "" || taskText.trim() === "") return;
    setTasks([...tasks, { time, text: taskText, done: false }]);
    setTime("");
    setTaskText("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const sortedTasks = tasks.sort((a, b) => a.time.localeCompare(b.time));
  const todoList = sortedTasks.filter((task) => !task.done);
  const doneList = sortedTasks.filter((task) => task.done);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-purple-700 drop-shadow">📅 Yours Daily Schedule</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="time"
            className="border border-purple-300 rounded-lg px-4 py-2 w-full focus:outline-purple-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <input
            type="text"
            className="border border-purple-300 rounded-lg px-4 py-2 w-full focus:outline-purple-500"
            placeholder="What do you want to do at this time?"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">🕐 Wanna Do</h2>
          {todoList.length === 0 && <p className="text-gray-500">All tasks completed!</p>}
          {todoList.map((task, idx) => (
            <div key={idx} className="flex items-center gap-4 mb-3">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(tasks.indexOf(task))}
                className="accent-purple-500"
              />
              <span className="text-gray-800">{task.time} - {task.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">✅ Done</h2>
          {doneList.length === 0 && <p className="text-gray-500">No tasks done yet.</p>}
          {doneList.map((task, idx) => (
            <div key={idx} className="flex items-center gap-4 mb-3 text-green-600">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(tasks.indexOf(task))}
                className="accent-green-500"
              />
              <span className="line-through">{task.time} - {task.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
