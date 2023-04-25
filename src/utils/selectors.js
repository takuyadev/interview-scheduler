export function getAppointmentsForDay(state, day) {
   // If days is empty
   if (state.days.length === 0) {
      return [];
   }

   // Filter the days based on current day ("monday")
   const res = state.days.filter((curr) => curr.name === day);

   // If nothing returned, then return empty
   if (res.length === 0) {
      return [];
   }

   // Map through appointments to convert index to actual appointment data
   // [1, 2, 3] = [{data}, {data}, {data}]
   return res[0].appointments.map((index) => state.appointments[index]);
}

// Get full interview object based on id
export const getInterview = (state, appointment) => {
   if (!appointment) {
      return null;
   }

   return {
      student: appointment.student,
      interviewer: state.interviewers[appointment.interviewer],
   };
};

export const getInterviewersForDay = (state, day) => {
   // Filter the days based on current day ("monday")
   const res = state.days.filter((curr) => curr.name === day);

   // If nothing returned, then return empty
   if (res.length === 0) {
      return [];
   }

   // Map through appointments to convert index to actual appointment data
   // [1, 2, 3] = [{data}, {data}, {data}]
   return res[0].interviewers.map((index) => state.interviewers[index]);
};

// Update spots based on arguments provided, returns number
export const updateSpots = (appointments) => {
   // If falsy, return 0
   if (!appointments) {
      return 0;
   }

   // If empty object, return 0
   if (Object.keys(appointments).length === 0) {
      return 0;
   }

   // Happy path
   const result = Object.values(appointments).reduce((acc, curr) => {
      // Increment only if interview is not null
      return !curr.interview ? ++acc : acc;
   }, 0);

   console.log(appointments)

   return result;
};
