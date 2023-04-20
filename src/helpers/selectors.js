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
