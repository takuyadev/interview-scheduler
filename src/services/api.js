import axios from "axios";

export const instance = axios.create({
   baseURL: process.env.REACT_APP_HOST_URL,
});

// @desc Gets appoinments, interviews, and interviewers data
export const getAllData = () => {
   return Promise.all([
      instance.get("/api/days"),
      instance.get("/api/appointments"),
      instance.get("/api/interviewers"),
   ]);
};

// @desc Gets all appointments from database
export const getAppointments = () => {
   return instance.get("/api/appointments");
};

// @desc Updates single appointment from database
// @params id, appointment
export const updateAppointment = (id, appointment) => {
   return instance.put(`/api/appointments/${id}`, appointment);
};

// @desc Updates single appointment from database
// @params id, appointment
export const deleteAppointment = (id) => {
   return instance.delete(`/api/appointments/${id}`);
};
