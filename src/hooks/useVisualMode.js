import { useCallback, useEffect, useState } from "react";

// Custom hook to handle changes in UI
export const useVisualMode = (initial) => {
   const [mode, setMode] = useState(initial);
   const [history, setHistory] = useState([initial]);

   // Transition to provided mode in params
   // useCallback to prevent rerenders when used as depen
   const transition = useCallback((value, replace = false) => {
      setMode(value);
      setHistory((prev) => {
         if (replace) {
            prev.pop();
         }
         return [...prev, value];
      });
   }, []);

   // Go back one time in history array
   const back = () => {
      setHistory((prev) => {
         prev.pop();
         setMode(prev[prev.length - 1]);
         return [...prev];
      });
   };

   useEffect(()=>{
      console.log(history)
   },[history])

   return { history, mode, back, transition };
};
