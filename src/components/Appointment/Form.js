import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
   const [student, setStudent] = useState(props.student || null);
   const [interviewer, setInterviewer] = useState(props.student || null);

   const handleCancel = () => {
      props.onCancel();
   };

   const handleSave = () => {
      props.onSave();
   };

   const handleInput = (event) => {
      setStudent(event.target.value);
   };

   return (
      <main className="appointment__card appointment__card--create">
         <section className="appointment__card-left">
            <form autoComplete="off">
               <input
                  className="appointment__create-input text--semi-bold"
                  name="name"
                  type="text"
                  placeholder="Enter Student Name"
                  onChange={handleInput}
               />
            </form>
            <InterviewerList
               interviewer={interviewer}
               interviewers={props.interviewers}
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
