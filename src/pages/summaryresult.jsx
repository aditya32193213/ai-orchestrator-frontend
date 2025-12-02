
// import React, { useEffect, useState } from "react";
// import API from "../api/backend";
// import { useNavigate } from "react-router-dom";

// export default function SummaryResult() {
//   const [data, setData] = useState(null);
//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [notifyResult, setNotifyResult] = useState(null);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // -------- Extract Summary + Answer safely ----------
//   const getSummaryText = (d) => d?.summary || d?.fullParsed?.summary || "";
//   const getAnswerText = (d) => d?.answer || d?.fullParsed?.answer || "";

//   // -------- Load summary from localStorage ----------
//   useEffect(() => {
//     const raw = localStorage.getItem("latestSummary");
//     if (!raw) return;

//     try {
//       const parsed = JSON.parse(raw);
//       setData(parsed);
//       if (parsed?.subject) setSubject(parsed.subject);
//     } catch (err) {
//       console.error("Failed to parse summary:", err);
//     }
//   }, []);

//   // -------- Send Email via backend -> n8n ----------
//   async function sendEmail() {
//     if (!email.trim()) {
//       setError("Recipient email is required.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     const summary = getSummaryText(data);
//     const answer = getAnswerText(data);

//     const structured = data?.fullParsed?.structured || {};
//     const question = data?.question || data?.fullParsed?.question || "";
//     const metadata = data?.fullParsed?.metadata || {};

//     const finalSubject = subject?.trim() || "";
//     const fullMessage = `Summary:\n${summary}\n\nAnswer:\n${answer}`;

//     try {
//       const res = await API.post("/api/notify", {
//         email,
//         subject: finalSubject,
//         summary: fullMessage,
//         answer,
//         structured,
//         question,
//         metadata,
//       });

//       setNotifyResult(res.data);

//       localStorage.setItem(
//         "notifyPayload",
//         JSON.stringify({
//           email,
//           subject: finalSubject,
//           body: fullMessage,
//           answer,
//           structured,
//           question,
//           metadata,
//         })
//       );
//     } catch (err) {
//       console.error("Email error:", err);
//       setError("Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ---------- If no summary found ----------
//   if (!data) {
//     return (
//       <div className="card p-4 mt-4">
//         <h4>No summary available</h4>
//         <p>Please upload a document first.</p>
//         <button className="btn btn-secondary" onClick={() => navigate("/")}>
//           Upload Document
//         </button>
//       </div>
//     );
//   }

//   const summaryText = getSummaryText(data);
//   const answerText = getAnswerText(data);
//   const structuredData = data?.fullParsed?.structured || {};

//   // ---------- Clean formatted n8n response ----------
//   const formatN8N = (r) => {
//     if (!r) return null;
//     return (
//       <div className="mt-4 p-3 border rounded bg-light">
//         <h5 className="fw-bold mb-3">n8n Email Response</h5>

//         {r.status && <p><strong>Status:</strong> {r.status}</p>}
//         {r.message && <p><strong>Message:</strong> {r.message}</p>}
//         {r.subject && <p><strong>Subject:</strong> {r.subject}</p>}
//         {r.emailSentTo && <p><strong>Sent To:</strong> {r.emailSentTo}</p>}

//         {r.body && (
//           <>
//             <strong>Email Body:</strong>
//             <pre className="p-3 mt-2 bg-white border rounded" style={{ whiteSpace: "pre-wrap" }}>
//               {r.body}
//             </pre>
//           </>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="card p-4 mt-4 shadow-sm">
//       <h2 className="mb-4 fw-bold">Summary Result</h2>

//       {/* -------- SUMMARY -------- */}
//       <div className="mb-4">
//         <label className="fw-bold mb-2 fs-5">Summary</label>
//         <pre
//           className="p-3 border rounded bg-light"
//           style={{
//             whiteSpace: "pre-wrap",
//             fontSize: "1.1rem",
//             lineHeight: "1.6",
//             fontFamily:
//               "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
//             fontWeight: 400,
//           }}
//         >
//           {summaryText}
//         </pre>
//       </div>

//       {/* -------- ANSWER -------- */}
//       <div className="mb-4">
//         <label className="fw-bold mb-2 fs-5">Answer</label>
//         <pre
//           className="p-3 border rounded bg-light"
//           style={{
//             whiteSpace: "pre-wrap",
//             fontSize: "1.1rem",
//             lineHeight: "1.6",
//             fontFamily:
//               "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
//             fontWeight: 400,
//           }}
//         >
//           {answerText}
//         </pre>
//       </div>

//       {/* -------- STRUCTURED TABLE -------- */}
//       <div className="mb-4">
//         <label className="fw-bold mb-2 fs-5">Extracted Structured Data</label>

//         {structuredData && Object.keys(structuredData).length > 0 ? (
//           <table className="table table-bordered table-striped">
//             <tbody>
//               {Array.isArray(structuredData)
//                 ? structuredData.map((row, i) => (
//                     <tr key={i}>
//                       <th style={{ width: "30%", background: "#f8f9fa" }}>
//                         {row.field || `Field ${i + 1}`}
//                       </th>
//                       <td style={{ whiteSpace: "pre-wrap" }}>
//                         {typeof row.value === "object"
//                           ? JSON.stringify(row.value, null, 2)
//                           : row.value}
//                       </td>
//                     </tr>
//                   ))
//                 : Object.entries(structuredData).map(([key, val]) => (
//                     <tr key={key}>
//                       <th style={{ width: "30%", background: "#f8f9fa" }}>{key}</th>
//                       <td style={{ whiteSpace: "pre-wrap" }}>
//                         {typeof val === "object"
//                           ? JSON.stringify(val, null, 2)
//                           : val}
//                       </td>
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-muted">No structured data extracted</p>
//         )}
//       </div>

//       {/* -------- EMAIL OPTIONS -------- */}
//       <h4 className="fw-bold mb-3">Email Options</h4>

//       <div className="mb-3">
//         <label className="form-label">Recipient Email</label>
//         <input
//           className="form-control"
//           placeholder="recipient@example.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Subject</label>
//         <input
//           className="form-control"
//           placeholder="Optional subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//         />
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}

//       {/* -------- ACTION BUTTONS -------- */}
//       <div className="d-flex gap-2 mt-3">
//         <button className="btn btn-success" disabled={loading} onClick={sendEmail}>
//           {loading ? "Sending..." : "Send Summary via n8n"}
//         </button>

//         <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
//           Upload Another
//         </button>

//         <button
//           className="btn btn-outline-primary"
//           onClick={() => {
//             const mergedText = `Summary:\n${summaryText}\n\nAnswer:\n${answerText}`;
//             localStorage.setItem(
//              "notifyPayload",
//               JSON.stringify({
//                 email,
//                    subject: subject?.trim() || "",
//                    body: mergedText,
//              })
// );


//             navigate("/notify");
//           }}
//         >
//           Open Full Mail Editor
//         </button>
//       </div>

//       {/* -------- n8n RESPONSE -------- */}
//       {notifyResult?.n8nResponse && formatN8N(notifyResult.n8nResponse)}
//     </div>
//   );
// }













// import React, { useEffect, useState } from "react";
// import API from "../api/backend";
// import { useNavigate } from "react-router-dom";

// export default function Notify() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");

//   // Extra fields required by backend/n8n
//   const [answer, setAnswer] = useState("");
//   const [structured, setStructured] = useState({});
//   const [question, setQuestion] = useState("");
//   const [metadata, setMetadata] = useState({});
//   const [summary, setSummary] = useState(""); // Keep summary if provided

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   // 🔄 Load notifyPayload from SummaryResult.jsx
//   useEffect(() => {
//     const raw = localStorage.getItem("notifyPayload");
//     if (!raw) return;

//     try {
//       const parsed = JSON.parse(raw);

//       setEmail(parsed.email || "");
//       setSubject(parsed.subject || "");
//       setBody(parsed.body || "");

//       // Load all additional fields
//       setAnswer(parsed.answer || "");
//       setStructured(parsed.structured || {});
//       setQuestion(parsed.question || "");
//       setMetadata(parsed.metadata || {});
//       setSummary(parsed.summary || "");

//     } catch (err) {
//       console.error("Invalid notifyPayload:", err);
//     }
//   }, []);

//   // -------------------------
//   // SEND EMAIL THROUGH BACKEND → n8n
//   // -------------------------
//   async function send() {
//     if (!email.trim()) {
//       alert("Recipient email is required");
//       return;
//     }

//     setLoading(true);

//     try {
//       // FINAL PAYLOAD (Corrected)
//       const payload = {
//         email: email.trim(),
//         subject: subject?.trim() || "", // Empty → AI generates subject
//         summary: body || "",            // Body goes to "summary" for AI prompt
//         answer,
//         structured,
//         question,
//         metadata
//       };

//       const res = await API.post("/api/notify", payload);
//       setResult(res.data);

//       localStorage.setItem(
//         "lastNotifyResponse",
//         JSON.stringify(res.data, null, 2)
//       );

//     } catch (err) {
//       console.error("Email send error:", err);
//       alert("Failed to send email");
//     }

//     setLoading(false);
//   }

//   // Formatter for n8n response (unchanged)
//   const formatN8N = (r) => {
//     if (!r) return null;

//     return (
//       <div className="mt-4 p-3 border rounded bg-light">
//         <h5 className="fw-bold mb-3">n8n Email Response</h5>

//         {r.status && <p><strong>Status:</strong> {r.status}</p>}
//         {r.message && <p><strong>Message:</strong> {r.message}</p>}
//         {r.subject && <p><strong>Subject:</strong> {r.subject}</p>}
//         {r.emailSentTo && <p><strong>Sent To:</strong> {r.emailSentTo}</p>}

//         {r.body && (
//           <>
//             <strong>Email Body:</strong>
//             <pre className="p-3 mt-2 bg-white border rounded" style={{ whiteSpace: "pre-wrap" }}>
//               {r.body}
//             </pre>
//           </>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="card p-4">
//       <h2 className="mb-4">Email Editor</h2>

//       {/* Recipient */}
//       <label>Recipient Email</label>
//       <input
//         className="form-control mb-2"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       {/* Subject */}
//       <label>Subject</label>
//       <input
//         className="form-control mb-2"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       />

//       {/* Email Body */}
//       <label>Body (HTML or Plain Text)</label>
//       <textarea
//         className="form-control mb-3"
//         rows="10"
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//       />

//       {/* Buttons */}
//       <div className="d-flex gap-2">
//         <button className="btn btn-success" onClick={send} disabled={loading}>
//           {loading ? "Sending..." : "Send Email"}
//         </button>

//         <button className="btn btn-secondary" onClick={() => navigate(-1)}>
//           Back
//         </button>
//       </div>

//       {/* n8n formatted response */}
//       {result?.n8nResponse && formatN8N(result.n8nResponse)}
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import API from "../api/backend";
import { useNavigate } from "react-router-dom";

export default function SummaryResult() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifyResult, setNotifyResult] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // -------- Extract Summary + Answer safely ----------
  const getSummaryText = (d) => d?.summary || d?.fullParsed?.summary || "";
  const getAnswerText = (d) => d?.answer || d?.fullParsed?.answer || "";

  // -------- Load summary from localStorage ----------
  useEffect(() => {
    const raw = localStorage.getItem("latestSummary");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setData(parsed);

      // If backend generated a subject earlier, prefill it
      if (parsed?.subject) setSubject(parsed.subject);
    } catch (err) {
      console.error("Failed to parse summary:", err);
    }
  }, []);

  // -------- Send Email via backend -> n8n ----------
  async function sendEmail() {
    if (!email.trim()) {
      setError("Recipient email is required.");
      return;
    }

    setError("");
    setLoading(true);

    const summary = getSummaryText(data);
    const answer = getAnswerText(data);

    const structured = data?.fullParsed?.structured || {};
    const question = data?.question || data?.fullParsed?.question || "";
    const metadata = data?.fullParsed?.metadata || {};

    const finalSubject = subject?.trim() || ""; // Allow empty → AI generates subject
    const fullMessage = `Summary:\n${summary}\n\nAnswer:\n${answer}`;

    try {
      const res = await API.post("/api/notify", {
        email,
        subject: finalSubject,
        summary: fullMessage,
        answer,
        structured,
        question,
        metadata,
      });

      setNotifyResult(res.data);

      localStorage.setItem(
        "notifyPayload",
        JSON.stringify({
          email,
          subject: finalSubject,
          body: fullMessage,
          answer,
          structured,
          question,
          metadata,
        })
      );
    } catch (err) {
      console.error("Email error:", err);
      setError("Failed to send email");
    } finally {
      setLoading(false);
    }
  }

  // ---------- If no summary found ----------
  if (!data) {
    return (
      <div className="card p-4 mt-4">
        <h4>No summary available</h4>
        <p>Please upload a document first.</p>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Upload Document
        </button>
      </div>
    );
  }

  const summaryText = getSummaryText(data);
  const answerText = getAnswerText(data);
  const structuredData = data?.fullParsed?.structured || {};

  // ---------- Clean formatted n8n response ----------
  const formatN8N = (r) => {
    if (!r) return null;
    return (
      <div className="mt-4 p-3 border rounded bg-light">
        <h5 className="fw-bold mb-3">n8n Email Response</h5>

        {r.status && <p><strong>Status:</strong> {r.status}</p>}
        {r.message && <p><strong>Message:</strong> {r.message}</p>}
        {r.subject && <p><strong>Subject:</strong> {r.subject}</p>}
        {r.emailSentTo && <p><strong>Sent To:</strong> {r.emailSentTo}</p>}

        {r.body && (
          <>
            <strong>Email Body:</strong>
            <pre
              className="p-3 mt-2 bg-white border rounded"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {r.body}
            </pre>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="card p-4 mt-4 shadow-sm">
      <h2 className="mb-4 fw-bold">Summary Result</h2>

      {/* -------- SUMMARY -------- */}
      <div className="mb-4">
        <label className="fw-bold mb-2 fs-5">Summary</label>
        <pre
          className="p-3 border rounded bg-light"
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {summaryText}
        </pre>
      </div>

      {/* -------- ANSWER -------- */}
      <div className="mb-4">
        <label className="fw-bold mb-2 fs-5">Answer</label>
        <pre
          className="p-3 border rounded bg-light"
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {answerText}
        </pre>
      </div>

      {/* -------- STRUCTURED DATA -------- */}
      <div className="mb-4">
        <label className="fw-bold mb-2 fs-5">Extracted Structured Data</label>

        {structuredData && Object.keys(structuredData).length > 0 ? (
          <table className="table table-bordered table-striped">
            <tbody>
              {Array.isArray(structuredData)
                ? structuredData.map((row, i) => (
                    <tr key={i}>
                      <th style={{ width: "30%", background: "#f8f9fa" }}>
                        {row.field || `Field ${i + 1}`}
                      </th>
                      <td style={{ whiteSpace: "pre-wrap" }}>
                        {typeof row.value === "object"
                          ? JSON.stringify(row.value, null, 2)
                          : row.value}
                      </td>
                    </tr>
                  ))
                : Object.entries(structuredData).map(([key, val]) => (
                    <tr key={key}>
                      <th style={{ width: "30%", background: "#f8f9fa" }}>
                        {key}
                      </th>
                      <td style={{ whiteSpace: "pre-wrap" }}>
                        {typeof val === "object"
                          ? JSON.stringify(val, null, 2)
                          : val}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No structured data extracted</p>
        )}
      </div>

      {/* -------- EMAIL OPTIONS -------- */}
      <h4 className="fw-bold mb-3">Email Options</h4>

      <div className="mb-3">
        <label className="form-label">Recipient Email</label>
        <input
          className="form-control"
          placeholder="recipient@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Subject</label>
        <input
          className="form-control"
          placeholder="Optional subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-success" disabled={loading} onClick={sendEmail}>
          {loading ? "Sending..." : "Send Summary via n8n"}
        </button>

        <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
          Upload Another
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => {
            const mergedText = `Summary:\n${summaryText}\n\nAnswer:\n${answerText}`;

            localStorage.setItem(
              "notifyPayload",
              JSON.stringify({
                email,
                subject: subject?.trim() || "",
                body: mergedText,
              })
            );

            navigate("/notify");
          }}
        >
          Open Full Mail Editor
        </button>
      </div>

      {/* -------- n8n RESPONSE -------- */}
      {notifyResult?.n8nResponse && formatN8N(notifyResult.n8nResponse)}
    </div>
  );
}





