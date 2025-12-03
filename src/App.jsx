import React from "react";
import Home from "./pages/fileupload";
import SummaryResult from "./pages/summaryresult";
import Notify from "./pages/notify";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useTheme } from "./context/themecontext";
import ThemeToggle from "./components/themetoggle";

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
      <Router>
        <nav className="navbar navbar-expand-lg" style={{background: theme === "dark" ? "#222" : "#fff"}}>
          <div className="container">
            <Link className={`navbar-brand ${theme === "dark" ? "text-light" : "text-dark"}`} to="/">AI Orchestrator</Link>
            <div className="d-flex align-items-center">
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<SummaryResult />} />
            <Route path="/notify" element={<Notify />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
