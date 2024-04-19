import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
