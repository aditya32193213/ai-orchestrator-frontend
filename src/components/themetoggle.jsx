import React from "react";
import { useTheme } from "../context/themecontext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-secondary"}`}
      onClick={toggle}
      title="Toggle theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
