import React, { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

import "./App.css";

// Main Task Management Dashboard Component
function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: "Task 1",
            description: "Complete the report",
            status: "Pending",
            dueDate: "2024-10-14",
          },
          {
            id: 2,
            title: "Task 2",
            description: "Review PR for the dashboard",
            status: "In Progress",
            dueDate: "2024-10-15",
          },
          {
            id: 3,
            title: "Task 3",
            description: "Team meeting",
            status: "Completed",
            dueDate: "2024-10-16",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [currentTask, setCurrentTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const saveTask = (task) => {
    if (currentTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      setCurrentTask(null);
    } else {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  const handleDelete = (task) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );
    if (confirmDelete) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
  };

  const cancelEdit = () => {
    setCurrentTask(null);
  };

  // Filter tasks by status and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="App">
      <h1>Task Management Dashboard</h1>

      {/* Search Input */}
      <div className="search">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter and Sort Options */}
      <div className="controls">
        <label>
          Filter by Status:
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label>
          Sort by Due Date:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <TaskForm
        currentTask={currentTask}
        saveTask={saveTask}
        cancelEdit={cancelEdit}
      />

      <div className="task-list">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
