import "./Application.scss";
import React from "react";
import DayList from "../components/DayList/DayList.jsx";
import Appointment from "../components/Appointment/index.jsx";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../utils/selectors";
import { DEFAULT } from "data/constants";
import { useApplicationData } from "hooks/useApplicationData";

// Default CSR page
const Application = () => {
   const { state, setDay, bookInterview, cancelInterview } = useApplicationData(DEFAULT);

   // Render appointment list based on state.appointments
   const AppointmentList = () => {
      // Get relevant data based on the day and time
      const appointments = getAppointmentsForDay(state, state.day);
      const interviewers = getInterviewersForDay(state, state.day);

      return appointments.map((appointment, i) => {
         // Get full interview details by id before drilling prop
         const interview = getInterview(state, appointment.interview);

         console.log(appointment)
         return (
            <Appointment
               key={appointment.id}
               id={appointment.id}
               time={appointment.time}
               interview={interview}
               interviewers={interviewers}
               onSave={bookInterview}
               onDelete={cancelInterview}
            />
         );
      });
   };

   return (
      <main className="layout">
         <section className="sidebar">
            <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
               <DayList days={state.days} day={state.day} onChange={setDay} />
            </nav>
            <img
               className="sidebar__lhl sidebar--centered"
               src="images/lhl.png"
               alt="Lighthouse Labs"
            />
         </section>
         <section className="schedule">{state.appointments && <AppointmentList />}</section>
      </main>
   );
};

export default Application;
