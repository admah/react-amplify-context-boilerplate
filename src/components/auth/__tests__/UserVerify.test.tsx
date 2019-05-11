import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import UserVerify from "../UserVerify";

afterEach(cleanup);

describe("UserVerify", () => {
  it("renders heading", async () => {
    const { getByText, getByTestId, container } = render(<UserVerify />);
    const userVerifyHeading = getByTestId("UserVerifyHeading");

    expect(userVerifyHeading.innerHTML).toBe("Your email has been verified.");
  });
});
