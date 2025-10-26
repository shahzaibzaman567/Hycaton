import React, { createContext, useState, useEffect } from "react";

export const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  // Default true = dark mode by default
  const [isDark, setIsDark] = useState(true);

  // Load saved preference from localStorage
  useEffect(() => {
    const savedPref = localStorage.getItem("darkMode");
    if (savedPref === null) {
      // agar user ne kabhi toggle nahi kiya
      setIsDark(true); // default dark
      applyMode(true);
      localStorage.setItem("darkMode", true);
    } else {
      const darkPref = savedPref === "true";
      setIsDark(darkPref);
      applyMode(darkPref);
    }
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
