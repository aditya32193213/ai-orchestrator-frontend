// import Home from "./pages/home.jsx";

// function App() {
//   return <Home />;
// }

// export default App;



// // App.jsx
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import FileUpload from "./components/fileupload.jsx";
// import SummaryResult from "./components/summaryresult.jsx";
// import Notify from "./notify";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* 1️⃣ Upload PDF + question → hits /api/extract */}
//         <Route path="/" element={<FileUpload />} />

//         {/* 2️⃣ Display Gemini summary */}
//         <Route path="/summary" element={<SummaryResult />} />

//         {/* 3️⃣ Send summary email via n8n → hits /api/notify */}
//         <Route path="/notify" element={<Notify />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }




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
