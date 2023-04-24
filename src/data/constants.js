export const MODE = {
   SHOW: "SHOW",
   EMPTY: "EMPTY",
   CREATE: "CREATE",
   SAVING: "SAVING",
   CONFIRM: "CONFIRM",
   DELETE: "DELETE",
   ERROR_EDIT: "ERROR_EDIT",
   ERROR_DELETE: "ERROR_DELETE",
   EDIT: "EDIT",
};

export const DEFAULT = {
   day: "Monday",
   days: [],
   appointments: null,
};

export const TEST_DATA = {
   days: [
      {
         id: 1,
         name: "Monday",
         appointments: [1, 2, 3],
         interviewers: [1, 2, 3, 4],
      },
      {
         id: 2,
         name: "Tuesday",
         appointments: [4, 5],
         interviewers: [1, 2],
      },
   ],
   appointments: {
      1: { id: 1, time: "12pm", interview: null },
      2: { id: 2, time: "1pm", interview: null },
      3: {
         id: 3,
         time: "2pm",
         interview: { student: "Archie Cohen", interviewer: 2 },
      },
      4: { id: 4, time: "3pm", interview: null },
      5: {
         id: 5,
         time: "4pm",
         interview: { student: "Chad Takahashi", interviewer: 2 },
      },
   },
   interviewers: {
      1: {
         id: 1,
         name: "Sylvia Palmer",
         avatar: "https://i.imgur.com/LpaY82x.png",
      },
      2: {
         id: 2,
         name: "Tori Malcolm",
         avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
      3: {
         id: 3,
         name: "Big Chungus",
         avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
      4: {
         id: 2,
         name: "Slugma Ween",
         avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
   },
};