import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { useVisualMode } from "components/hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const Appointment = (props) => {
   const SHOW = "SHOW";
   const EMPTY = "EMPTY";
   const CREATE = "CREATE";
   const SAVING = "SAVING";
   const CONFIRM = "CONFIRM";
   const DELETE = "DELETE";
   const setInitial = props.interview ? SHOW : EMPTY;
   const { mode, transition, back } = useVisualMode(setInitial);

   // Sets form state to saving immediately, and attempts to save
   const handleSave = (name, interviewer) => {
      transition(SAVING);
      props.onSave(name, interviewer);
   };

   // Sets form state to saving immediately, and attempts to save
   const handleDelete = (id) => {
      transition(CONFIRM);
   };

   // Sets form state to saving immediately, and attempts to save
   const handleConfirm = (id) => {
      transition(DELETE);
      props.onDelete(id);
   };

   return (
      <article className="appointment">
         <Header time={props.time} />

         {mode === CONFIRM && <Confirm onConfirm={handleConfirm} />}
         {mode === SHOW && (
            <Show
               name={props.interview.student}
               onDelete={handleDelete}
               interviewer={props.interview.interviewer}
            />
         )}
         {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
         {mode === CREATE && (
            <Form onSave={handleSave} onCancel={() => back()} interviewers={props.interviewers} />
         )}

         {mode === SAVING && <Status message="Saving" />}
         {mode === DELETE && <Status message="Delete" />}
      </article>
   );
};

export default Appointment;
