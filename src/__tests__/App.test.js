import React, { act } from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  localStorage.clear(); // Clear localStorage before each test
});

test("renders App with initial tasks", () => {
  render(<App />);

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Complete the report")).toBeInTheDocument();
});

test("filters tasks by status", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/filter by status/i), {
    target: { value: "Completed" },
  });

  expect(screen.getByText("Task 3")).toBeInTheDocument();
  expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
});

test("searches tasks by title", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/search tasks.../i), {
    target: { value: "Task 1" },
  });

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
});
