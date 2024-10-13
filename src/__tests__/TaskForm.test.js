import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

test("renders TaskForm for creating a new task", () => {
  const saveTask = jest.fn();
  const cancelEdit = jest.fn();

  render(<TaskForm saveTask={saveTask} cancelEdit={cancelEdit} />);

  expect(screen.getByText(/create new task/i)).toBeInTheDocument();
});

test("renders TaskForm for editing an existing task", () => {
  const saveTask = jest.fn();
  const cancelEdit = jest.fn();
  const currentTask = {
    title: "Existing Task",
    description: "Description",
    dueDate: "2024-10-15",
    status: "Pending",
  };

  render(
    <TaskForm
      currentTask={currentTask}
      saveTask={saveTask}
      cancelEdit={cancelEdit}
    />
  );

  expect(screen.getByDisplayValue(/existing task/i)).toBeInTheDocument();
});

test("validates the form input and displays error messages", () => {
  const saveTask = jest.fn();
  const cancelEdit = jest.fn();

  render(<TaskForm saveTask={saveTask} cancelEdit={cancelEdit} />);

  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  expect(screen.getByText(/title is required/i)).toBeInTheDocument();
  expect(screen.getByText(/due date is required/i)).toBeInTheDocument();
});

test("submits the form with correct data", () => {
  const saveTask = jest.fn();
  const cancelEdit = jest.fn();

  render(<TaskForm saveTask={saveTask} cancelEdit={cancelEdit} />);

  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "New Task" },
  });
  fireEvent.change(screen.getByLabelText(/due date/i), {
    target: { value: "2024-10-18" },
  });

  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  expect(saveTask).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "New Task",
      dueDate: "2024-10-18",
    })
  );
});
