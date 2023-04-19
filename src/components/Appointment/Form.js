import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
   const [student, setStudent] = useState(props.student || "");
   const [interviewer, setInterviewer] = useState(props.interviewer || null);

   const reset = () => {
      setStudent("");
      setInterviewer(null);
   };

   const handleCancel = () => {
      props.onCancel();
      reset();
   };

   const handleSave = () => {
      props.onSave();
      reset();
   };

   const handleInput = (event) => {
      setStudent(event.target.value);
   };

   return (
      <main className="appointment__card appointment__card--create">
         <section className="appointment__card-left">
            <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
               <input
                  className="appointment__create-input text--semi-bold"
                  name="name"
                  type="text"
                  value={student}
                  placeholder="Enter Student Name"
                  onChange={handleInput}
               />
            </form>
            <InterviewerList
               interviewer={interviewer}
               interviewers={props.interviewers}
               onChange={setInterviewer}
            />
         </section>
         <section className="appointment__card-right">
            <section className="appointment__actions">
               <Button onClick={handleCancel} danger>
                  Cancel
               </Button>
               <Button onClick={handleSave} confirm>
                  Save
               </Button>
            </section>
         </section>
      </main>
   );
};

export default Form;
