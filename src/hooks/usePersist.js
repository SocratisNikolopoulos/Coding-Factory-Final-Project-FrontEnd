/**
 * usePersist - Custom React hook for managing persistence in localStorage.
 * Manages a boolean value in localStorage to maintain persistence across sessions.
 * @returns {[boolean, Function]} Returns an array containing the persistence state and its setter.
 * - boolean: Represents the current persistence state (true/false).
 * - Function: Setter function to update the persistence state.
 */

import { useState, useEffect } from "react";

const usePersist = () => {
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  return [persist, setPersist];
};

export default usePersist;
