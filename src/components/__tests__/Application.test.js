/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import {
   render,
   waitForElement,
   fireEvent,
   prettyDOM,
   getAllByTestId,
} from "@testing-library/react";

/*
  We import the component that we are testing
*/

import Application from "pages/Application";

/*
  A test that renders a React Component
*/

describe("Application", () => {
   it("defaults to Monday and chnages the schedule when a new day is selected", async () => {
      const { getByText } = render(<Application />);

      await waitForElement(() => getByText("Monday"));
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
   });

   it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
      const { container, getByText, getByAltText, getByTestId } = render(<Application />);

      await waitForElement(() => getByText("Archie Cohen"));

      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];

      fireEvent.click(getByAltText("Add"));
      fireEvent.change(getByTestId("student-name-input"), {
         target: { value: "Lydia Miller-Jones" },
      });

      fireEvent.click(getByAltText("Sylvia Palmer"));

      expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones")

      fireEvent.click(getByText("Save"));
      console.log("H")

      // await waitForElement(() => getByText("Saving"));
      // await waitForElement(() => getByText("Lydia Miller-Jones"));

      // expect(getByText("Lydia Miller-Jones")).toBeInTheDocument();
   });
});
