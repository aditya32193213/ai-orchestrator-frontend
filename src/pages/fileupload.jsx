import React, { useState, useEffect } from "react";
import API from "../api/backend";
import { useNavigate } from "react-router-dom";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("Summarize this document");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Clear old session data when user begins new upload
  useEffect(() => {
    localStorage.removeItem("latestSummary");
    localStorage.removeItem("notifyPayload");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please choose a PDF or text file first.");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("question", question);

      const res = await API.post("/api/extract", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const payload = res.data || {};

      
      const parsed = {
        fullParsed: {
          summary: payload.summary,
          answer: payload.answer,
          structured: payload.structured,
          metadata: payload.metadata,
          question: payload.question || question || "No specific question found."
        },
        subject: "AI Summary Result"
      };

      localStorage.setItem("latestSummary", JSON.stringify(parsed));

      navigate("/summary");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err?.response?.data?.message || "Upload failed. Check server logs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="card p-4 shadow-sm mt-4"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      
      <h2 className="fw-bold mb-2 text-center">Upload Document</h2>
      <p className="text-muted text-center mb-4">
        Upload a PDF or text file to extract and summarize it using Gemini AI.
      </p>

      
      <form onSubmit={handleSubmit}>

        
        <div className="mb-3">
          <label className="form-label fw-semibold">Choose File</label>
          <input
            type="file"
            accept=".pdf,.txt"
            className="form-control"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        
        <div className="mb-3">
          <label className="form-label fw-semibold">Question / Prompt</label>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="form-control"
            placeholder="E.g., Summarize this document in 3 lines"
          />
        </div>

        
        {error && (
          <div className="alert alert-danger mt-2">{error}</div>
        )}

        
        <button
          className="btn btn-primary w-100 mt-3"
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Summarize"}
        </button>
      </form>
    </div>
  );
}
