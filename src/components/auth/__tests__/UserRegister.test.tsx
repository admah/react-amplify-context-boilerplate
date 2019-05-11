import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import UserRegister from "../UserRegister";

afterEach(cleanup);

describe("UserRegister", () => {
  it("renders heading", async () => {
    //const { getByText, getByTestId, container } = render(<UserRegister />);
    //const UserRegisterHeading = getByTestId("UserRegisterHeading");
    //expect(UserRegisterHeading.innerHTML).toBe("Setup Subscription");
  });
});
