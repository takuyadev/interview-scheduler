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
   within,
   getByText,
   getByTestId,
   getByAltText,
   getAllByTestId,
   waitForElementToBeRemoved,
   queryByText,
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
      // Render container for application
      const { debug, container } = render(<Application />);

      // Wait for axios call to load in
      await waitForElement(() => getByText(container, "Archie Cohen"));

      // Go through form
      fireEvent.click(getByAltText(container, "Add"));
      fireEvent.change(getByTestId(container, "student-name-input"), {
         target: { value: "Lydia Miller-Jones" },
      });
      fireEvent.click(getByAltText(container, "Sylvia Palmer"));
      expect(getByTestId(container, "student-name-input")).toHaveValue("Lydia Miller-Jones");
      fireEvent.click(getByText(container, "Save"));
      expect(getByText(container, "Saving")).toBeInTheDocument();

      // After saving is completed, check whether appointment is added
      await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
      expect(getByText(container, "Lydia Miller-Jones")).toBeInTheDocument();

      // Check if spots has been updated
      const monday = getAllByTestId(container, "day")[0];
      const { getByText: getMondayText } = within(monday);

      expect(getMondayText("no spots remaining")).toBeInTheDocument();
   });

   it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
      // 1. Render the Application.
      const {  container } = render(<Application />);

      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));

      // 3. Click the "Delete" button on the first one with delete rendered
      fireEvent.click(getByAltText(container, "Delete"));

      // 4. Click on "Confirm" button to initiate delete process
      fireEvent.click(getByText(container, "Confirm"));

      // 5. See if "Delete" status is shown
      expect(getByText(container, "Delete"));

      // 6. Wait for "Delete" status to be hidden
      await waitForElementToBeRemoved(() => getByText(container, "Delete"));
      expect(queryByText(container, "Archie Cohen")).toBeNull()
      
      const monday = getAllByTestId(container, "day")[0];
      const { getByText: getMondayText } = within(monday);
      expect(getMondayText("2 spots remaining")).toBeInTheDocument();
   });

   it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {});

   it("shows the save error when failing to save an appointment", () => {});

   it("shows the delete error when failing to delete an existing appointment", () => {});
});
