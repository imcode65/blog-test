"use client";
import { useState, useEffect } from "react";
import Icon from "./Icon";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggle}>
      <Icon name={isDarkMode ? "dark_mode" : "light_mode"} />
    </button>
  );
};

export default DarkModeToggle;
