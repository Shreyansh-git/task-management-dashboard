import React, { useState, useEffect } from "react";

const TaskForm = ({ currentTask, saveTask, cancelEdit }) => {
  const [title, setTitle] = useState(currentTask?.title || "");
  const [description, setDescription] = useState(
    currentTask?.description || ""
  );
  const [dueDate, setDueDate] = useState(currentTask?.dueDate || "");
  const [status, setStatus] = useState(currentTask?.status || "Pending");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDueDate(currentTask.dueDate);
      setStatus(currentTask.status);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
    }
  }, [currentTask]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!dueDate) newErrors.dueDate = "Due Date is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      saveTask({
        id: currentTask?.id || Date.now(),
        title,
        description,
        dueDate,
        status,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{currentTask ? "Edit Task" : "Create New Task"}</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>
      <div>
        <label>Description (optional)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <p className="error">{errors.dueDate}</p>}
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button style={{ background: "cadetblue" }} type="submit">
        {currentTask ? "Save Changes" : "Add Task"}
      </button>
      {currentTask && (
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
