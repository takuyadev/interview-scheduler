import "components/Application.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
   // Setup entire app state for project
   const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: null,
   });

   // State aliaeses
   const setDay = (day) => setState({ ...state, day });

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

   const bookInterview = (id, interview) => {
      // Setup for one appointment
      const appointment = {
         ...state.appointments[id],
         interview: { ...interview },
      };

      // Merge current appointments with new appointment
      const appointments = {
         ...state.appointments,
         [id]: appointment,
      };

      // Set state to save changes
      axios
         .put(`http://localhost:8001/api/appointments/${id}`, appointment)
         .then(() => {
            setState((prev) => ({ ...prev, appointments }));
         })
         .catch((err) => console.error(err));
   };

   // Handle the saving of interview to database and client state
   const onSave = (id) => (name, interviewer) => {
      const interview = {
         student: name,
         interviewer,
      };

      bookInterview(id, interview);
   };

   //
   const onDelete = (id) => {
      axios
         .delete(`http://localhost:8001/api/appointments/${id}`)
         .then(() => {
            axios.get("http://localhost:8001/api/appointments").then((res) => {
               setState((prev) => ({
                  ...prev,
                  appointments: res.data,
               }));
            });
         })
         .catch((err) => console.error(err));
   };

   // Render appointment list based on state.appointments
   const AppointmentList = () => {
      // Get relevant data based on the day and time
      const filterAppointments = getAppointmentsForDay(state, state.day);
      const filterInterviewers = getInterviewersForDay(state, state.day);

      return filterAppointments.map((appointment) => {
         // Get full interview details by id before drilling prop
         const interview = getInterview(state, appointment.interview);

         return (
            <Appointment
               key={appointment.id}
               id={appointment.id}
               time={appointment.time}
               interview={interview}
               interviewers={filterInterviewers}
               onSave={(name, interviewer) => onSave(appointment.id)(name, interviewer)}
               onDelete={() => onDelete(appointment.id)}
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
