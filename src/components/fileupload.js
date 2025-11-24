import React, { useState } from "react";
import API from "../api/backend.js";

function FileUpload({ onExtracted }) {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Upload a PDF first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);

    try {
      setLoading(true);
      const res = await API.post("/api/extract", formData);

      onExtracted(res.data); // send back response to parent

    } catch (error) {
      console.error(error);
      alert("Failed to extract PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow-lg">
      <h3 className="mb-3">Upload PDF Document</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Choose PDF File:</label>
          <input
            type="file"
            accept="application/pdf"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Question:</label>
          <input
            type="text"
            className="form-control"
            placeholder="What do you want to ask?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Extracting..." : "Extract PDF"}
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
