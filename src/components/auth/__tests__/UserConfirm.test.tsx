import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import UserConfirm from "../UserConfirm";

afterEach(cleanup);

describe("UserConfirm", () => {
  it("renders heading", async () => {
    const { getByText, getByTestId, container } = render(<UserConfirm />);
    const UserConfirmHeading = getByTestId("UserConfirmHeading");

    expect(UserConfirmHeading.innerHTML).toBe("You're all set!");
  });
});
