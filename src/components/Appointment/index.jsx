import "./styles.scss";
import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import { MODE } from "data/constants";
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";
import Form from "./Form.jsx";
import Status from "./Status.jsx";
import Confirm from "./Confirm.jsx";
import Error from "./Error.jsx";

// @desc Renders out single appointment, with logic for switching between modes
// @props id, time, interview, interviewers, onSave, onDelete

const Appointment = (props) => {
   // Initial states
   const setInitial = props.interview ? MODE.SHOW : MODE.EMPTY;
   const { mode, transition, back } = useVisualMode(setInitial);

   // Sets form state to saving immediately, and attempts to save
   const handleSave = (student, interviewer) => {
      if (!student || !interviewer) {
         return transition(MODE.ERROR_SAVE);
      }

      transition(MODE.SAVING);

      // If error is caught, then render error message
      props.onSave(props.id, student, interviewer)
      .then(()=>{
         transition(MODE.SHOW)
      })
      .catch(() => {
         transition(MODE.ERROR_EDIT);
      });
   };

   // Sets form state to saving immediately, and attempts to save
   const handleConfirm = () => {
      transition(MODE.DELETE);

      // After promise resolves, then transition to empty
      props
         .onDelete(props.id)
         .then(() => transition(MODE.EMPTY))
         .catch(() => transition(MODE.ERROR_DELETE));
   };

   // Sets form state to saving immediately, and attempts to save
   const handleEdit = () => transition(MODE.EDIT);

   // Sets form state to saving immediately, and attempts to save
   const handleDelete = () => transition(MODE.CONFIRM);

   return (
      <article data-testid="appointment" className="appointment">
         <Header time={props.time} />

         {/* Render empty card with add button  */}
         {mode === MODE.EMPTY && <Empty onAdd={() => transition(MODE.CREATE)} />}

         {/* Render for new appointment being created */}
         {mode === MODE.CREATE && (
            <Form onSave={handleSave} onCancel={() => back()} interviewers={props.interviewers} />
         )}

         {/* Show current filled in appointment */}
         {mode === MODE.SHOW && props.interview && (
            <Show
               name={props.interview.student}
               interviewer={props.interview.interviewer}
               onDelete={handleDelete}
               onEdit={handleEdit}
            />
         )}

         {/* Show Edit page for interview */}
         {mode === MODE.EDIT && (
            <Form
               student={props.interview.student}
               interviewer={props.interview.interviewer.id}
               onSave={handleSave}
               onCancel={() => back()}
               interviewers={props.interviewers}
            />
         )}

         {/* Render confirm before deletion */}
         {mode === MODE.CONFIRM && <Confirm onCancel={back} onConfirm={handleConfirm} />}

         {/* Render statuses for loading API calls */}
         {mode === MODE.SAVING && <Status message="Saving" />}
         {mode === MODE.DELETE && <Status message="Delete" />}

         {/* Error messages for respective modes */}
         {mode === MODE.ERROR_SAVE && (
            <Error onClose={back} message="Please enter your name and select interviewer" />
         )}

         {/* Error messages for respective modes */}
         {mode === MODE.ERROR_EDIT && (
            <Error onClose={back} message="Error editing your appointment" />
         )}
         {mode === MODE.ERROR_DELETE && (
            <Error onClose={back} message="Error deleting your appointment" />
         )}
      </article>
   );
};

export default Appointment;
