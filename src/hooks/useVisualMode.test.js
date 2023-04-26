import { useVisualMode } from "./useVisualMode";
import { renderHook, act } from "@testing-library/react-hooks";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
   // 1. Render the hook with the default value
   const { result } = renderHook(() => useVisualMode(FIRST));

   // 2. Check if the initial mode is FIRST
   expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
   // 1. Render the hook with the default value
   const { result } = renderHook(() => useVisualMode(FIRST));

   // 2. Transition to SECOND mode
   act(() => result.current.transition(SECOND));
   // 3. Check if the current mode is SECOND
   expect(result.current.mode).toBe(SECOND);
});

test("useVisualMode should return to previous mode", () => {
   // 1. Render the hook with the default value
   const { result } = renderHook(() => useVisualMode(FIRST));

   // 2. Transition through FIRST, SECOND, and THIRD modes
   act(() => result.current.transition(SECOND));
   act(() => result.current.transition(THIRD));

   // 3. Go back twice and check if the mode returns to SECOND and then FIRST
   act(() => result.current.back());
   expect(result.current.mode).toBe(SECOND);
   act(() => result.current.back());
   expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should replace the current mode", () => {
   // 1. Render the hook with the default value
   const { result } = renderHook(() => useVisualMode(FIRST));

   // 2. Transition to SECOND mode
   act(() => result.current.transition(SECOND));

   // 3. Replace the current mode (SECOND) with THIRD mode
   act(() => result.current.transition(THIRD, true));

   // 4. Go back and check if the mode returns to FIRST
   act(() => result.current.back());
   expect(result.current.mode).toBe(FIRST);
});
