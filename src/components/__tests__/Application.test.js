import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "pages/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
