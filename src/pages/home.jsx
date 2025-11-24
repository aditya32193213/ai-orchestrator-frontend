import React, { useState } from "react";
import FileUpload from "../components/fileupload.js";
import SummaryResult from "../components/summaryresult.js";
import ThemeToggle from "../components/themetoggle.jsx";

function Home() {
  const [extractedData, setExtractedData] = useState(null);

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>AI Document Orchestrator</h1>
        <ThemeToggle />
      </div>

      {!extractedData ? (
        <FileUpload onExtracted={setExtractedData} />
      ) : (
        <SummaryResult extractedData={extractedData} />
      )}
    </div>
  );
}

export default Home;
