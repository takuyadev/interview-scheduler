import { useReducer, useEffect } from "react";
import { deleteAppointment, getAllData, updateAppointment } from "services/api";
import { getAppointmentsForDay, updateSpots } from "utils/selectors";

const TYPE = {
   SET_DAY: "SET_DAY",
   SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
   SET_INTERVIEW: "SET_INTERVIEW",
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
         console.log(data)
         const mergeData = { ...state, ...data };
         return mergeData;
      }

      // Updates single interview based on id and appointment
      case TYPE.SET_INTERVIEW: {
         const { id, appointment } = action.payload;
         return {
            ...state,
            appointments: { ...state.appointments, [id]: { ...appointment } },
         };
      }

      // Throw error on any unsupported types, including null
      default:
         throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
   }
}

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

      // Get appointments for the day to map through
      const appointments = getAppointmentsForDay(state, state.day);

      // Update spots only on currently selected day
      const days = state.days.map((day) => {
         // -1 since state doesn't update immediately
         const spots = state.day === day.name ? updateSpots(appointments) - 1 : day.spots;

         return {
            ...day,
            spots
         };
      });

      // Return promise, for promise handling for prop
      return updateAppointment(id, appointment).then(() => {
         dispatch({ type: TYPE.SET_INTERVIEW, payload: { id, appointment } });
         dispatch({ type: TYPE.SET_APPLICATION_DATA, payload: { data: { days } } });
      });
   };

   // Handles the deletion of an appointment
   const cancelInterview = (id) =>
      // After deletion, should update all data to prevent stale state
      deleteAppointment(id).then(() => {
         updateData();
      });

   useEffect(() => {
      console.log(state);
   }, [state]);
   // Listen for load, and get all data to overwrite default state
   useEffect(() => {
      updateData();
   }, []);

   return { state, setDay, bookInterview, cancelInterview };
};
