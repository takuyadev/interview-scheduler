/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, waitForElement, fireEvent } from "@testing-library/react";

/*
  We import the component that we are testing
*/

import Application from "pages/Application";

/*
  A test that renders a React Component
*/

describe("Application", () => {
   it("renders without crashing", () => {
      // render(<Application />);
   });
   it("defaults to Monday and chnages the schedule when a new day is selected", () => {
      const { getByText } = render(<Application />);

      return waitForElement(() => getByText("Monday")).then(() => {
         fireEvent.click(getByText("Tuesday"));
         expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
   });
});
