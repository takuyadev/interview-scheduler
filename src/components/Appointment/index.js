import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { useVisualMode } from "components/hooks/useVisualMode";
import Form from "./Form";

const SHOW = "SHOW";
const EMPTY = "EMPTY";

const Appointment = (props) => {
   const setInitial = props.interview ? "SHOW" : "EMPTY";
   const { mode, transition, back } = useVisualMode(setInitial);

   return (
      <article className="appointment">
         <Header time={props.time} />
         {mode === "SHOW" && (
            <Show name={props.interview.student} interviewer={props.interview.interviewer} />
         )}
         {mode === "EMPTY" && <Empty onAdd={() => transition("CREATE")} />}
         {mode === "CREATE" && <Form onCancel={() => back()}interviewers={[]}/>}

      </article>
   );
};

export default Appointment;
