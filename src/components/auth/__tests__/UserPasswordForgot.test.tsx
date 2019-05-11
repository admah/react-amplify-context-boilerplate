import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import UserPasswordForgot from "../UserPasswordForgot";

afterEach(cleanup);

describe("UserPasswordForgot", () => {
  it("renders heading", async () => {
    const { getByText, getByTestId, container } = render(
      <UserPasswordForgot />
    );
    const userPasswordForgotHeading = getByTestId("UserPasswordForgotHeading");

    expect(userPasswordForgotHeading.innerHTML).toBe("Forgot Password?");
  });
});
