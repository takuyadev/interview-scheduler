import "./Application.scss";
import React from "react";
import DayList from "../components/DayList/DayList.jsx";
import { AppointmentList } from "components/Appointment/AppointmentList.jsx";
import { DEFAULT } from "data/constants";
import { useApplicationData } from "hooks/useApplicationData";

// Default CSR page
const Application = () => {
   const { state, setDay, bookInterview, cancelInterview } = useApplicationData(DEFAULT);

   return (
      <main className="layout">
         <section className="sidebar">
            <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
               {state.days && <DayList days={state.days} day={state.day} onChange={setDay} />}
            </nav>
            <img
               className="sidebar__lhl sidebar--centered"
               src="images/lhl.png"
               alt="Lighthouse Labs"
            />
         </section>
         <section className="schedule">
            {state.appointments && (
               <AppointmentList
                  state={state}
                  bookInterview={bookInterview}
                  cancelInterview={cancelInterview}
               />
            )}
         </section>
      </main>
   );
};

export default Application;
