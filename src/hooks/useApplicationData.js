import { useReducer, useEffect } from "react";
import { deleteAppointment, getAllData, updateAppointment } from "services/api";
import { reducer } from "reducers/application";
import { TYPE } from "reducers/application";

// Custom hook to manage application state
export const useApplicationData = (initialValue) => {
   const [state, dispatch] = useReducer(reducer, initialValue);

   // State aliases
   const setDay = (day) => dispatch({ type: TYPE.SET_DAY, payload: { day } });

   // Gets all data, and updates it to state
   const updateData = () => {
      getAllData().then((res) => {
         dispatch({
            type: TYPE.SET_APPLICATION_DATA,
            payload: {
               data: {
                  days: res[0].data,
                  appointments: res[1].data,
                  interviewers: res[2].data,
               },
            },
         });
      });
   };

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

      // Return promise, for promise handling for prop
      return updateAppointment(id, appointment).then(() => {
         dispatch({ type: TYPE.SET_APPOINTMENT, payload: { id, appointment } });
         dispatch({ type: TYPE.UPDATE_SPOTS });
      });
   };

   // Handles the deletion of an appointment
   const cancelInterview = (id) =>
      // After deletion, should update all data to prevent stale state
      deleteAppointment(id).then(() => {
         dispatch({ type: TYPE.UPDATE_SPOTS });

      });

   // Listen for changes on websocket
   useEffect(() => {
      // Establish connection to websocket
      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8001");

      // Listen for messages, and set interview if anything changes
      socket.addEventListener("message", (e) => {
         const data = JSON.parse(e.data);
         dispatch({
            type: TYPE.SET_INTERVIEW,
            payload: { id: data.id, interview: data.interview },
         });
         dispatch({ type: TYPE.UPDATE_SPOTS });
      });

      // Cleanup socket on unmount
      return () => {
         socket.close()
      };
   }, []);

   // Listen for load, and get all data to overwrite default state
   useEffect(() => {
      updateData();
   }, []);


   return { state, setDay, bookInterview, cancelInterview };
};
