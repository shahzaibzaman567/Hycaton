import React, { createContext, useState, useEffect } from "react";

export const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Load saved preference from localStorage
  useEffect(() => {
    const darkPref = localStorage.getItem("darkMode") === "true";
    setIsDark(darkPref);
    applyMode(darkPref);
  }, []);

  // Apply dark/light classes to body
  const applyMode = (dark) => {
    if (dark) {
      document.body.classList.add("bg-dark", "text-white");
      document.body.classList.remove("bg-white", "text-dark");
    } else {
      document.body.classList.remove("bg-dark", "text-white");
      document.body.classList.add("bg-white", "text-dark");
    }
  };

  const toggleMode = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      applyMode(newMode);
      return newMode;
    });
  };

  return (
    <ToggleContext.Provider value={{ isDark, toggleMode }}>
      {children}
    </ToggleContext.Provider>
  );
};
