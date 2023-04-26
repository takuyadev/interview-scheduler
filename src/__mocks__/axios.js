import { MOCKS_DATA } from "data/constants";
let fixtures = { ...MOCKS_DATA };

export default {
   defaults: { baseURL: "" },
   put: jest.fn(() => {
      return Promise.resolve({ status: 204, statusText: "No Content" });
   }),
   delete: jest.fn(() => {
      // If isError is false, return success
      fixtures.appointments["2"].interview = null;
      return Promise.resolve({ status: 200, statusText: "Deleted" });
   }),
   get: jest.fn((url) => {
      switch (url) {
         case "/api/days": {
            return Promise.resolve({
               status: 200,
               statusText: "OK",
               data: fixtures.days,
            });
         }
         case "/api/appointments": {
            return Promise.resolve({
               status: 200,
               statusText: "OK",
               data: fixtures.appointments,
            });
         }

         case "/api/interviewers": {
            return Promise.resolve({
               status: 200,
               statusText: "OK",
               data: fixtures.interviewers,
            });
         }
         default: {
            throw new Error("Unsupported action");
         }
      }
   }),
};
