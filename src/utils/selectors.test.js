import {
   getAppointmentsForDay,
   getInterviewersForDay,
   getInterview,
   updateSpots,
} from "utils/selectors";
import { TEST_DATA } from "../data/constants.js";

describe("getAppointmentsForDay", () => {
   test("getAppointmentsForDay returns an array", () => {
      const result = getAppointmentsForDay(TEST_DATA, "Monday");
      expect(Array.isArray(result)).toBe(true);
   });

   test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
      const result = getAppointmentsForDay(TEST_DATA, "Monday");
      expect(result.length).toEqual(3);
   });

   test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
      const [first, second] = getAppointmentsForDay(TEST_DATA, "Tuesday");
      expect(first).toEqual(TEST_DATA.appointments["4"]);
      expect(second).toEqual(TEST_DATA.appointments["5"]);
   });

   test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
      const result = getAppointmentsForDay({ days: [] }, "Monday");
      expect(result.length).toEqual(0);
   });

   test("getAppointmentsForDay returns an empty array when the day is not found", () => {
      const result = getAppointmentsForDay(TEST_DATA, "Wednesday");
      expect(result.length).toEqual(0);
   });
});

describe("getInterviewersForDay()", () => {
   test("getInterviewersForDay returns an array", () => {
      const result = getInterviewersForDay(TEST_DATA, "Monday");
      expect(Array.isArray(result)).toBe(true);
   });

   test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
      const result = getInterviewersForDay(TEST_DATA, "Monday");
      expect(result.length).toEqual(4);
   });

   test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
      const [first, second] = getInterviewersForDay(TEST_DATA, "Tuesday");
      expect(first).toEqual(TEST_DATA.interviewers["1"]);
      expect(second).toEqual(TEST_DATA.interviewers["2"]);
   });

   test("getInterviewersForDay returns an empty array when the days data is empty", () => {
      const result = getInterviewersForDay({ days: [] }, "Monday");
      expect(result.length).toEqual(0);
   });

   test("getInterviewersForDay returns an empty array when the day is not found", () => {
      const result = getInterviewersForDay(TEST_DATA, "Wednesday");
      expect(result.length).toEqual(0);
   });
});

describe("getInterview()", () => {
   test("getInterview returns an object with the interviewer data", () => {
      const result = getInterview(TEST_DATA, TEST_DATA.appointments["3"].interview);
      expect(result).toEqual(
         expect.objectContaining({
            student: expect.any(String),
            interviewer: expect.objectContaining({
               id: expect.any(Number),
               name: expect.any(String),
               avatar: expect.any(String),
            }),
         })
      );
   });

   test("getInterview returns null if no interview is booked", () => {
      const result = getInterview(TEST_DATA, TEST_DATA.appointments["2"].interview);
      expect(result).toBeNull();
   });
});

describe("updateSpots()", () => {
   test("updateSpots should return 0 if there invalid properties are passed", () => {
      const result = updateSpots(null);
      expect(result).toBe(0);
   });

   test("updateSpots should return 0 when there are no spots left ({})", () => {
      const result = updateSpots({});
      expect(result).toBe(0);
   });

   test("updateSpots should return 2 when there are only 2 spots left", () => {
      const result = updateSpots(TEST_DATA.appointments);
      expect(result).toBe(3);
   });
});
