import { getAppointmentsForDay, updateSpots } from "utils/selectors";

export const TYPE = {
   SET_DAY: "SET_DAY",
   SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
   SET_APPOINTMENT: "SET_APPOINTMENT",
   SET_INTERVIEW: "SET_INTERVIEW",
   UPDATE_SPOTS: "UPDATE_SPOTS",
};

export const reducer = (state, action) => {
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
};
