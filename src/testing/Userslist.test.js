import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UsersList  from '../components/DeleteQuizPage';

test("renders users list", () => {
  // Render the component
  render(<UsersList />);

  // Verify that the component renders the table header
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Price")).toBeInTheDocument();
  expect(screen.getByText("Category")).toBeInTheDocument();
  expect(screen.getByText("Date")).toBeInTheDocument();
  expect(screen.getByText("Action")).toBeInTheDocument();
});

test("displays users data", () => {
  // Mock the data for testing
  const mockRows = [
    { id: 1, name: "John Doe", uid: "123", username: "johndoe", age: 30 },
    { id: 2, name: "Jane Smith", uid: "456", username: "janesmith", age: 25 },
  ];

  // Mock the getUsers function to return the mockRows data
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockRows),
    })
  );

  // Render the component
  render(<UsersList />);

  // Verify that the users data is displayed in the table rows
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Jane Smith")).toBeInTheDocument();
});

test("opens edit modal on edit icon click", () => {
  // Mock the data for testing
  const mockRows = [{ id: 1, name: "John Doe", uid: "123" }];

  // Mock the getUsers function to return the mockRows data
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockRows),
    })
  );

  // Render the component
  render(<UsersList />);

  // Click the edit icon
  fireEvent.click(screen.getByLabelText("Edit User"));

  // Verify that the edit modal is opened
  expect(screen.getByText("Edit User")).toBeInTheDocument();
});

test("closes edit modal on close button click", () => {
  // Mock the data for testing
  const mockRows = [{ id: 1, name: "John Doe", uid: "123" }];

  // Mock the getUsers function to return the mockRows data
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockRows),
    })
  );

  // Render the component
  render(<UsersList />);

  // Click the edit icon to open the modal
  fireEvent.click(screen.getByLabelText("Edit User"));

  // Click the close button
  fireEvent.click(screen.getByText("Close"));

  // Verify that the edit modal is closed
  expect(screen.queryByText("Edit User")).not.toBeInTheDocument();
});

// You can continue adding more test cases to cover different scenarios and functionalities of the component.
