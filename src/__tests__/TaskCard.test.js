import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

test("renders TaskCard with correct information", () => {
  const task = {
    id: 1,
    title: "Test Task",
    description: "This is a test task",
    status: "Pending",
    dueDate: "2024-10-14",
  };
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  render(<TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />);

  expect(screen.getByText(task.title)).toBeInTheDocument();
  expect(screen.getByText(task.description)).toBeInTheDocument();
  expect(screen.getByText(`Status: ${task.status}`)).toBeInTheDocument();
  expect(screen.getByText(`Due Date: ${task.dueDate}`)).toBeInTheDocument();
});

test("calls onEdit when Edit button is clicked", () => {
  const task = { id: 1, title: "Test Task" };
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  render(<TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />);

  fireEvent.click(screen.getByText(/edit/i));
  expect(onEdit).toHaveBeenCalledWith(task);
});

test("calls onDelete when Delete button is clicked", () => {
  const task = { id: 1, title: "Test Task" };
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  render(<TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />);

  fireEvent.click(screen.getByText(/delete/i));
  expect(onDelete).toHaveBeenCalledWith(task);
});
