import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { MemoryRouter, Route } from "react-router-dom";
import "jest-dom/extend-expect";

import UserCreate from "../UserCreate";

afterEach(cleanup);

describe("UserCreate", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Route path="/user">
          <UserCreate />
        </Route>
      </MemoryRouter>
    );

  it("renders heading", async () => {
    const { getByText, getByTestId, container } = renderComponent();
    const userCreateHeading = getByTestId("UserCreateHeading");

    expect(userCreateHeading.innerHTML).toBe("Create Account");
  });
});
