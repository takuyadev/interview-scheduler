import { useState, useEffect } from "react";
import { deleteAppointment, getAllData } from "services/api";
import { updateAppointment } from "services/api";

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
   const cancelInterview = (id) =>
      // After deletion, should update all data to prevent stale state
      deleteAppointment(id).then(() => {
         updateData();
      });

   return { state, setDay, bookInterview, cancelInterview };
};
