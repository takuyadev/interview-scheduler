import "./Application.scss";
import React, { useState, useEffect } from "react";
import DayList from "../components/DayList/DayList.jsx";
import Appointment from "../components/Appointment/index.jsx";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../utils/selectors";
import { deleteAppointment, getAllData, updateAppointment } from "services/api";

// Default CSR page
const Application = () => {
   // Setup entire app state for project
   const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: null,
   });

   // State aliases
   const setDay = (day) => setState({ ...state, day });

   // Gets all data, and updates it to state
   const updateData = () => {
      getAllData().then((res) => {
         setState((prev) => ({
            ...prev,
            days: res[0].data,
            appointments: res[1].data,
            interviewers: res[2].data,
         }));
      });
   }

   // On load call for days and appointments to populate with data
   useEffect(() => {
      updateData()
   }, []);

   // Handle the saving of interview to database and client state
   const bookInterview = (id, name, interviewer) => {
      // Setup appointment to be pushed for update
      const appointment = {
         ...state.appointments[id],
         interview: {
            student: name,
            interviewer,
         },
      };

      // Merge current appointments with new appointment
      const appointments = {
         ...state.appointments,
         [id]: appointment,
      };

      // Return promise, for promise handling for prop
      return updateAppointment(id, appointment).then(() => {
         setState((prev) => ({ ...prev, appointments }));
      });
   };

   // Handles the deletion of an appointment
   const handleDelete = (id) =>

      // After deletion, should update all data to prevent stale state
      deleteAppointment(id).then(() => {
         updateData()
      });

   // Render appointment list based on state.appointments
   const AppointmentList = () => {
      // Get relevant data based on the day and time
      const appointments = getAppointmentsForDay(state, state.day);
      const interviewers = getInterviewersForDay(state, state.day);

      return appointments.map((appointment) => {
         // Get full interview details by id before drilling prop
         const interview = getInterview(state, appointment.interview);

         return (
            <Appointment
               key={appointment.id}
               id={appointment.id}
               time={appointment.time}
               interview={interview}
               interviewers={interviewers}
               onSave={bookInterview}
               onDelete={handleDelete}
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
