import { DEFAULT } from "data/constants";
import { useApplicationData } from "./useApplicationData";
import { renderHook, act } from "react-hooks-testing-library";

describe("useApplicationData()", () => {
   test("should render with default value", () => {
      const { result } = renderHook(() => useApplicationData(DEFAULT));

      expect(result.current.state).toBe(DEFAULT);
   });

   test("setDay should update the state day to provided value", () => {
      const { result } = renderHook(() => useApplicationData(DEFAULT));
      act(() => result.current.setDay("Tuesday"));
      expect(result.current.day).toBe("Tuesday");
   });

   // test("bookInterview should call an update API request and update state", () => {});

   // test("cancelInterview should call a delete API request and update state", () => {});
});
