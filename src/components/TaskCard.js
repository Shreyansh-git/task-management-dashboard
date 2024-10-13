const TaskCard = ({ task, onEdit, onDelete }) => {
  const { title, description, status, dueDate } = task;

  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Due Date:</strong> {dueDate}
      </p>

      <div className="task-actions">
        <button style={{ background: "grey" }} onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          style={{ background: "indianred" }}
          onClick={() => onDelete(task)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
