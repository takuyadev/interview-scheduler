import { useState } from "react";

export const useVisualMode = (initial) => {
   const [mode, setMode] = useState(initial);
   const [history, setHistory] = useState([initial]);

   const transition = (value, replace = false) => {
      setMode(value);
      setHistory((prev) => {
         if (replace) {
            prev.pop();
         }

         return [...prev, value];
      });
   };

   const back = () => {
      setHistory((prev) => {
         prev.pop();
         setMode(prev[prev.length - 1]);
         return [...prev];
      });
   };

   return { history, mode, back, transition };
};
