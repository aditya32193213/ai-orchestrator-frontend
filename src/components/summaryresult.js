import React, { useState } from "react";
import API from "../api/backend";

function SummaryResult({ extractedData }) {
  const [email, setEmail] = useState("");
  const [notifyResult, setNotifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendToAI = async () => {
    if (!email) return alert("Enter an email address");

    const payload = {
      text: extractedData.text,
      question: extractedData.question,
      extractedJson: { email },
    };

    try {
      setLoading(true);
      const res = await API.post("/api/notify", payload);
      setNotifyResult(res.data);

    } catch (error) {
      console.error(error);
      alert("Failed to send data to AI workflow");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow-lg mt-4">
      <h3 className="mb-3">Extracted Document Text</h3>

      <textarea
        className="form-control"
        rows="8"
        value={extractedData.text}
        readOnly
      />

      <div className="mt-4">
        <label className="form-label">Send results to email:</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        className="btn btn-success w-100 mt-3"
        onClick={sendToAI}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send to AI + Email"}
      </button>

      {notifyResult && (
        <div className="alert alert-info mt-4">
          <h5>AI Summary:</h5>
          <p>{notifyResult.n8nResponse?.analysis}</p>

          <strong>Email Sent:</strong>{" "}
          {notifyResult.n8nResponse?.emailSent ? "Yes" : "No"}
        </div>
      )}
    </div>
  );
}

export default SummaryResult;
