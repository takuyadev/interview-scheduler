import { useReducer, useEffect } from "react";
import { deleteAppointment, getAllData, updateAppointment } from "services/api";
import { getAppointmentsForDay, updateSpots } from "utils/selectors";

const TYPE = {
   SET_DAY: "SET_DAY",
   SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
   SET_APPOINTMENT: "SET_APPOINTMENT",
   SET_INTERVIEW: "SET_INTERVIEW",
   UPDATE_SPOTS: "UPDATE_SPOTS",
};

function reducer(state, action) {
   switch (action.type) {
      // Updates single day based on payload
      case TYPE.SET_DAY:
         const { day } = action.payload;
         return { ...state, day };

      // Updates all data based on provided payload
      case TYPE.SET_APPLICATION_DATA: {
         const { data } = action.payload;
         const mergeData = { ...state, ...data };
         return mergeData;
      }

      // Updates single interview based on id and appointment
      case TYPE.SET_INTERVIEW: {
         const { id, interview } = action.payload;
         return {
            ...state,
            appointments: { ...state.appointments, [id]: { ...state.appointments[id], interview } },
         };
      }

      // Updates single interview based on id and appointment
      case TYPE.SET_APPOINTMENT: {
         const { id, appointment } = action.payload;
         return {
            ...state,
            appointments: { ...state.appointments, [id]: { ...appointment } },
         };
      }

      // Updates spots for selected day
      case TYPE.UPDATE_SPOTS: {
         // Get appointments for the day to map through
         const appointments = getAppointmentsForDay(state, state.day);

         // Update spots only on currently selected day (state.day)
         const days = state.days.map((day) => {
            const spots = state.day === day.name ? updateSpots(appointments) : day.spots;

            return {
               ...day,
               spots,
            };
         });

         // Return updated state with updated days
         return { ...state, days };
      }

      // Throw error on any unsupported types, including null
      default:
         throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
   }
}

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
         updateData();
      });

   // Listen for changes on websocket
   useEffect(() => {
      // Establish connection to websocket
      const socket = new WebSocket(process.REACT_APP_WEBSOCKET_URL || "ws://localhost:8001");

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
         socket.addEventListener("close", () => {});
         socket.removeEventListener("open", () => {});
         socket.removeEventListener("message", () => {});
      };
   }, []);

   // Listen for load, and get all data to overwrite default state
   useEffect(() => {
      updateData();
   }, []);

   return { state, setDay, bookInterview, cancelInterview };
};
