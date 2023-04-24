import { useState, useEffect } from "react";
import { deleteAppointment, getAllData } from "services/api";
import { updateAppointment } from "services/api";
import { getAppointmentsForDay, updateSpots } from "utils/selectors";

export const useApplicationData = (initialValue) => {
   const [state, setState] = useState(initialValue);

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
   };

   // Listen for load, and get all data to overwrite default state
   useEffect(() => {
      updateData();
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

      // Get appointments for the day to map through
      const appointments = getAppointmentsForDay(state, "Monday");

      // Update spots only on currently selected day
      const days = state.days.map((day) => {

         // -1 since state doesn't update immediately
         const spots = state.day === day.name ? updateSpots(appointments) - 1 : day.spots;

         return {
            ...day,
            spots,
         };
      });

      // Return promise, for promise handling for prop
      return updateAppointment(id, appointment).then(() => {
         setState((prev) => ({
            ...prev,
            days,
            appointments: { ...prev.appointments, [id]: { ...appointment } },
         }));
      });
   };

   // Handles the deletion of an appointment
   const cancelInterview = (id) =>
      // After deletion, should update all data to prevent stale state
      deleteAppointment(id).then(() => {
         updateData();
      });

   return { state, setDay, bookInterview, cancelInterview };
};
