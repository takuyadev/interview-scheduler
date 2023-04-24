import "./styles.scss";
import React from "react";
import { useVisualMode } from "components/hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const Appointment = (props) => {
   const SHOW = "SHOW";
   const EMPTY = "EMPTY";
   const CREATE = "CREATE";
   const SAVING = "SAVING";
   const CONFIRM = "CONFIRM";
   const DELETE = "DELETE";
   const ERROR_EDIT = "ERROR_EDIT";
   const ERROR_DELETE = "ERROR_DELETE";
   const EDIT = "EDIT";

   // Initial states
   const setInitial = props.interview ? SHOW : EMPTY;
   const { mode, transition, back } = useVisualMode(setInitial);

   // Sets form state to saving immediately, and attempts to save
   const handleSave = (student, interviewer) => {
      transition(SAVING);
      props.onSave(props.id, student, interviewer, () => {
         transition(ERROR_EDIT, true);
      });
   };

   // Sets form state to saving immediately, and attempts to save
   const handleDelete = () => {
      transition(CONFIRM);
   };

   // Sets form state to saving immediately, and attempts to save
   const handleConfirm = () => {
      transition(DELETE);
      props.onDelete(props.id, () => {
         transition(ERROR_DELETE, true);
      });
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

         {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={handleConfirm} />}
         {mode === SAVING && <Status message="Saving" />}
         {mode === DELETE && <Status message="Delete" />}

         {mode === ERROR_EDIT && (
            <Error onClose={() => back()} message="Error editing your appointment" />
         )}
         {mode === ERROR_DELETE && (
            <Error onClose={() => back()} message="Error deleting your appointment" />
         )}
      </article>
   );
};

export default Appointment;
