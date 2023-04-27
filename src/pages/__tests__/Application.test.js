/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";
import axios from "axios";

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

import Application from "pages/Application/Application";

/*
  A test that renders a React Component
*/

describe("Application", () => {
   it("defaults to Monday and chnages the schedule when a new day is selected", async () => {
      // 1. Render container for application
      const { getByText } = render(<Application />);

      // 2. Check if "Monday" is displayed onto page
      await waitForElement(() => getByText("Monday"));

      // 3. Click on "Tuesday" on the navbar
      fireEvent.click(getByText("Tuesday"));

      // 4. After click, expect Tuesday appointments to be displayed
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
   });

   it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
      // 1. Render container for application
      const { container } = render(<Application />);

      // 2. Check if "Archie Cohen", person with appointment is displayed
      await waitForElement(() => getByText(container, "Archie Cohen"));

      // 3. Click on "Add" button on empty appointment
      fireEvent.click(getByAltText(container, "Add"));

      // 4. Type in name into textbox
      fireEvent.change(getByTestId(container, "student-name-input"), {
         target: { value: "Lydia Miller-Jones" },
      });
      expect(getByTestId(container, "student-name-input")).toHaveValue("Lydia Miller-Jones");

      // 5. Select interviewer
      fireEvent.click(getByAltText(container, "Sylvia Palmer"));

      // 6. Click on "Save" to save appointment onto database
      fireEvent.click(getByText(container, "Save"));
      expect(getByText(container, "Saving")).toBeInTheDocument();

      // 7. After saving is completed, check whether appointment is added
      await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
      expect(getByText(container, "Lydia Miller-Jones")).toBeInTheDocument();

      // 8. Check if spots has been updated
      const monday = getAllByTestId(container, "day")[0];
      const { getByText: getMondayText } = within(monday);

      expect(getMondayText("no spots remaining")).toBeInTheDocument();
   });

   it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      // 1. Render container for application
      const { container } = render(<Application />);

      // 2. Wait for axios call to load in
      await waitForElement(() => getByText(container, "Archie Cohen"));

      // 3. Click on "Edit" Button
      fireEvent.click(getByAltText(container, "Edit"));

      // 4. Input student name into textbox
      fireEvent.change(getByTestId(container, "student-name-input"), {
         target: { value: "Archie Cohen" },
      });

      // 5. Select interviewer
      fireEvent.click(getByAltText(container, "Tori Malcolm"));
      expect(getByTestId(container, "student-name-input")).toHaveValue("Archie Cohen");

      // 6. Save changes for edit
      fireEvent.click(getByText(container, "Save"));
      expect(getByText(container, "Saving")).toBeInTheDocument();

      // 7. After saving is completed, check whether appointment is edited
      await waitForElement(() => getByText(container, "Archie Cohen"));
      expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

      // 8. Check if spots remained unchanged
      const monday = getAllByTestId(container, "day")[0];
      const { getByText: getMondayText } = within(monday);
      expect(getMondayText("1 spot remaining")).toBeInTheDocument();
   });

   it("shows the save error when failing to save an appointment", async () => {
      // 0. Mock reject axios value
      axios.put.mockRejectedValueOnce();

      // 1. Render the Application.
      const { container } = render(<Application />);

      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));

      // 3. Click the "Delete" button on the first one with delete rendered
      fireEvent.click(getByAltText(container, "Edit"));

      // 4. Input student name into textbox
      fireEvent.change(getByTestId(container, "student-name-input"), {
         target: { value: "Archie Cohen" },
      });

      // 5. Select interviewer
      fireEvent.click(getByAltText(container, "Tori Malcolm"));
      expect(getByTestId(container, "student-name-input")).toHaveValue("Archie Cohen");

      // 6. Save changes for edit
      fireEvent.click(getByText(container, "Save"));

      // 7. See if "Delete" status is shown
      expect(getByText(container, "Saving")).toBeInTheDocument();

      // 8. Wait for "Delete" status to be hidden
      await waitForElementToBeRemoved(() => getByText(container, "Saving"));
      expect(queryByText(container, "Error")).toBeInTheDocument();

      // 9. Check if spots left is the correct amount
      const monday = getAllByTestId(container, "day")[0];
      const { getByText: getMondayText } = within(monday);
      expect(getMondayText("1 spot remaining")).toBeInTheDocument();
   });

   it("shows the delete error when failing to delete an existing appointment", async () => {
      axios.delete.mockRejectedValueOnce();

      // 1. Render the Application.
      const { container } = render(<Application />);

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

      // 7. Show "Error" on page
      expect(queryByText(container, "Error")).toBeInTheDocument();

      // 8. Check if spots left is unchanged
      const monday = getAllByTestId(container, "day")[0];
      const { getByText: getMondayText } = within(monday);
      expect(getMondayText("1 spot remaining")).toBeInTheDocument();
   });

   it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
      // 1. Render the Application.
      const { container } = render(<Application />);

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
      expect(queryByText(container, "Archie Cohen")).toBeNull();

      // 7. Check if spots left is the correct amount
      const monday = getAllByTestId(container, "day")[0];
      const { getByText: getMondayText } = within(monday);
      expect(getMondayText("2 spots remaining")).toBeInTheDocument();
   });
});
