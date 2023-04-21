import "components/Application.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {
   // Setup entire app state for project
   const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: null,
   });

   // State aliaeses
   const setDay = (day) => setState({ ...state, day });

   const dailyAppointments = [];

   // On load call for days and appointments to populate with data
   useEffect(() => {
      Promise.all([
         axios.get("http://localhost:8001/api/days"),
         axios.get("http://localhost:8001/api/appointments"),
         axios.get("http://localhost:8001/api/interviewers"),
      ]).then((res) => {
         setState((prev) => ({
            ...prev,
            days: res[0].data,
            appointments: res[1].data,
            interviewers: res[2].data,
         }));
      });
   }, []);

   // Render appointment list based on state.appointments
   const AppointmentList = () => {
      const filterAppointments = getAppointmentsForDay(state, state.day);
      return filterAppointments.map((appointment) => {
         const interview = getInterview(state, appointment.interview);

         return (
            <Appointment
               key={appointment.id}
               id={appointment.id}
               time={appointment.time}
               interview={appointment.interview}
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
}
