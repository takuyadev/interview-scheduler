import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_HOST_URL;

// @desc Gets appoinments, interviews, and interviewers data
export const getAllData = () => {
   return Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
   ]);
};

// @desc Gets all appointments from database
export const getAppointments = () => {
   return axios.get("/api/appointments");
};

// @desc Updates single appointment from database
// @params id, appointment
export const updateAppointment = (id, appointment) => {
   return axios.put(`/api/appointments/${id}`, appointment);
};

// @desc Updates single appointment from database
// @params id, appointment
export const deleteAppointment = (id) => {
   return axios.delete(`/api/appointments/${id}`);
};
