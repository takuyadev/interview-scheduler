import React from "react";
import { render, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form.jsx";

afterEach(cleanup);

describe("Form", () => {
   const interviewers = [
      {
         id: 1,
         student: "Sylvia Palmer",
         avatar: "https://i.imgur.com/LpaY82x.png",
      },
   ];

   it("renders without student name if not provided", () => {
      /* 1. Render Form with name and interviewers props, but without student prop */
      const { getByPlaceholderText } = render(
         <Form name="Lydia Miller-Jones" interviewers={interviewers} />
      );

      /* 2. Check if the student name input field has an empty value */
      expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
   });

   it("renders with initial student name", () => {
      // 1. Render Form with interviewers and student props
      const { getByTestId } = render(
         <Form interviewers={interviewers} student="Lydia Miller-Jones" />
      );

      // 2. Check if the student name input field has the provided student name value
      expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
   });

   it("validates that the student name is not blank", () => {
      /* 1. Create the mock onSave function */
      const onSave = jest.fn();

      /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
      const { getByText } = render(
         <Form interviewers={interviewers} onSave={onSave} student={undefined} />
      );
      fireEvent.click(getByText("Save"));

      /* 3. Click the save button */
      expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
      expect(onSave).not.toHaveBeenCalled();
   });

   it("validates that the interviewer cannot be null", () => {
      /* 1. Create the mock onSave function */
      const onSave = jest.fn();

      /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
      const { getByText } = render(
         <Form interviewers={null} onSave={onSave} student="Lydia Miller-Jones" />
      );
      fireEvent.click(getByText("Save"));

      /* 3. Click the save button */
      expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
      expect(onSave).not.toHaveBeenCalled();
   });

   it("calls onSave function when the name and interviewer is defined", () => {
      /* 1. Create the mock onSave function */
      const onSave = jest.fn();

      /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
      const { queryByText, getByText } = render(
         <Form
            interviewers={interviewers}
            interviewer={interviewers[0].id}
            onSave={onSave}
            student="Lydia Miller-Jones"
         />
      );
      fireEvent.click(getByText("Save"));

      /* 3. Click the save button */
      expect(queryByText(/student name cannot be blank/i)).toBeNull();
      expect(queryByText(/please select an interviewer/i)).toBeNull();
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
   });

   it("submits the name entered by the user", () => {
      /* 1. Create the mock onSave function */
      const onSave = jest.fn();

      /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
      const { getByText, getByPlaceholderText } = render(
         <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
      );

      /* 3. Type in student name in form */
      const input = getByPlaceholderText("Enter Student Name");
      fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });

      /* 4. Save form */
      fireEvent.click(getByText("Save"));
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
   });

   it("calls onCancel and resets the input field", () => {
      const onCancel = jest.fn();

      // 1. Render Form with interviewers, name, onSave, and onCancel props
      const { getByText, getByPlaceholderText, queryByText } = render(
         <Form
            interviewers={interviewers}
            name="Lydia Mill-Jones"
            onSave={jest.fn()}
            onCancel={onCancel}
         />
      );

      // 2. Click the Save button
      fireEvent.click(getByText("Save"));

      // 3. Change the student name input field value
      fireEvent.change(getByPlaceholderText("Enter Student Name"), {
         target: { value: "Lydia Miller-Jones" },
      });

      // 4. Click the Cancel button
      fireEvent.click(getByText("Cancel"));

      // 5. Check if the student name validation error is not present
      expect(queryByText(/student name cannot be blank/i)).toBeNull();

      // 6. Check if the student name input field has been reset to an empty value
      expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

      // 7. Check if the onCancel function has been called once
      expect(onCancel).toHaveBeenCalledTimes(1);
   });
});
