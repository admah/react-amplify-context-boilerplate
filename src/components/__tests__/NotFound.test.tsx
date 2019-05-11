import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import NotFound from "../NotFound";

afterEach(cleanup);

describe("NotFound", () => {
  it("renders Menu", async () => {
    const { getByText, getByTestId, container } = render(<NotFound />);
    const message = getByTestId("NotFoundMessage");
    expect(message.innerHTML).toBe(
      "Sorry, but we could not find what you're looking for."
    );
  });
});
