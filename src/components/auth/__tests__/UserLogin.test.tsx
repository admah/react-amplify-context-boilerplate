import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import UserLogin from "../UserLogin";

afterEach(cleanup);

describe("UserLogin", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Route path="/user/login">
          <UserLogin />
        </Route>
      </MemoryRouter>
    );

  it("renders heading", async () => {
    const { getByText, getByTestId, container } = renderComponent();
    const userLoginHeading = getByTestId("UserLoginHeading");

    expect(userLoginHeading.innerHTML).toBe("User Login");
  });
});
