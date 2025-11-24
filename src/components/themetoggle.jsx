import React, { useContext } from "react";
import { ThemeContext } from "../context/themecontext";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="btn btn-secondary ms-3"
      onClick={toggleTheme}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}

export default ThemeToggle;
