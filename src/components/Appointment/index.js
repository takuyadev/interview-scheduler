import "./styles.scss";
import React from "react";
import { useVisualMode } from "components/hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
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
   const EDIT = "EDIT";

   // Initial states
   const setInitial = props.interview ? SHOW : EMPTY;
   const { mode, transition, back } = useVisualMode(setInitial);

   // Sets form state to saving immediately, and attempts to save
   const handleSave = (name, interviewer) => {
      transition(SAVING);
      props.onSave(name, interviewer);
   };

   // Sets form state to saving immediately, and attempts to save
   const handleDelete = () => {
      transition(CONFIRM);
   };

   // Sets form state to saving immediately, and attempts to save
   const handleConfirm = (id) => {
      transition(DELETE);
      props.onDelete(id);
   };

   // Sets form state to saving immediately, and attempts to save
   const handleEdit = () => {
      transition(EDIT);
   };

   return (
      <article className="appointment">
         <Header time={props.time} />

         {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
         {mode === CREATE && (
            <Form onSave={handleSave} onCancel={() => back()} interviewers={props.interviewers} />
         )}
         {mode === SHOW && (
            <Show
               name={props.interview.student}
               onDelete={handleDelete}
               onEdit={handleEdit}
               interviewer={props.interview.interviewer}
            />
         )}

         {mode === EDIT && (
            <Form
               student={props.interview.student}
               interviewer={props.interview.interviewer.id}
               onSave={handleSave}
               onCancel={() => back()}
               interviewers={props.interviewers}
            />
         )}

         {mode === CONFIRM && <Confirm onConfirm={handleConfirm} />}
         {mode === SAVING && <Status message="Saving" />}
         {mode === DELETE && <Status message="Delete" />}
      </article>
   );
};

export default Appointment;
