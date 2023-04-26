import React from "react";
import Appointment from "./index.jsx";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "utils/selectors";

// Render appointment list based on state.appointments
export const AppointmentList = (props) => {
   // Get relevant data based on the day and time
   const appointments = getAppointmentsForDay(props.state, props.state.day);
   const interviewers = getInterviewersForDay(props.state, props.state.day);

   return appointments.map((appointment) => {
      // Get full interview details by id before drilling prop
      const interview = getInterview(props.state, appointment.interview);

      return (
         <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            onSave={props.bookInterview}
            onDelete={props.cancelInterview}
         />
      );
   });
};
