import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import InterviewerList from "../InterviewerList/InterviewerList.jsx";

// @desc Renders out form for adding or editing appointment
// @props onCancel, onSave, student, interviewer

function Form(props) {
   // Control student name and interviewer's id with states
   const [student, setStudent] = useState(props.student || "");
   const [interviewer, setInterviewer] = useState(props.interviewer || null);
   const [error, setError] = useState("");

   // Sets states back to default
   const reset = () => {
      setStudent("");
      setError("");
      setInterviewer(null);
   };

   // Handles change of input
   const handleInput = (event) => setStudent(event.target.value);

   // Cancels, then resets form back to default
   const handleCancel = () => {
      props.onCancel();
      reset();
   };

   // Saves, then resets form back to default
   const handleSave = () => {
      if (student === "") {
         setError("Student name cannot be blank");
         return;
      }

      if (interviewer === null) {
         setError("Please select an interviewer");
         return;
      }

      props.onSave(student, interviewer);
      reset();
   };

   return (
      <main className="appointment__card appointment__card--create">
         <section className="appointment__card-left">
            <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
               <input
                  className="appointment__create-input text--semi-bold"
                  name="name"
                  type="text"
                  data-testid="student-name-input"
                  placeholder="Enter Student Name"
                  value={student}
                  onChange={handleInput}
               />
            </form>
            <section className="appointment__validation">{error}</section>
            {props.interviewers && (
               <InterviewerList
                  interviewer={interviewer}
                  interviewers={props.interviewers}
                  onClick={setInterviewer}
               />
            )}
         </section>
         <section className="appointment__card-right">
            <section className="appointment__actions">
               <Button onClick={handleCancel} data-testid="cancel" danger={"true"}>
                  Cancel
               </Button>
               <Button onClick={handleSave} data-testid="save" confirm={"true"}>
                  Save
               </Button>
            </section>
         </section>
      </main>
   );
}

export default Form;
