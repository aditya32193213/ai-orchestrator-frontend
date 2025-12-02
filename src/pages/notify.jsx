// import React, { useEffect, useState } from "react";
// import API from "../api/backend";
// import { useNavigate } from "react-router-dom";

// export default function Notify() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");

//   // Extra fields required by backend/n8n/Gemini
//   const [answer, setAnswer] = useState("");
//   const [structured, setStructured] = useState({});
//   const [question, setQuestion] = useState("");
//   const [metadata, setMetadata] = useState({});

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   // Format n8n response nicely
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

//   // Load notifyPayload data from SummaryResult.jsx
//   useEffect(() => {
//     const raw = localStorage.getItem("notifyPayload");
//     if (!raw) return;

//     try {
//       const parsed = JSON.parse(raw);

//       setEmail(parsed.email || "");
//       setSubject(parsed.subject || "");
//       setBody(parsed.body || "");

//       setAnswer(parsed.answer || "");
//       setStructured(parsed.structured || {});
//       setQuestion(parsed.question || "");
//       setMetadata(parsed.metadata || {});
//     } catch (err) {
//       console.error("Invalid notifyPayload:", err);
//     }
//   }, []);

//   // Send data to backend -> then to n8n -> then to Gemini
//   async function send() {
//     if (!email.trim()) {
//       alert("Recipient email is required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         email: email.trim(),

//         // These two are key for Gemini:
//         subject: subject || "",
//         summary: body || "",

//         // Supporting fields:
//         answer: answer || "",
//         structured: structured || {},
//         question: question || "",
//         metadata: metadata || {}
//       };

//       const res = await API.post("/api/notify", payload);

//       setResult(res.data);

//       localStorage.setItem("lastNotifyResponse", JSON.stringify(res.data, null, 2));
//     } catch (err) {
//       console.error("Email send error:", err);
//       alert("Failed to send email");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="card p-4">
//       <h2 className="mb-4">Email Editor</h2>

//       <label>Recipient Email</label>
//       <input
//         className="form-control mb-2"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <label>Subject</label>
//       <input
//         className="form-control mb-2"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       />

//       <label>Body (HTML or Plain Text)</label>
//       <textarea
//         className="form-control mb-3"
//         rows="10"
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//       />

//       <div className="d-flex gap-2">
//         <button className="btn btn-success" onClick={send} disabled={loading}>
//           {loading ? "Sending..." : "Send Email"}
//         </button>

//         <button className="btn btn-secondary" onClick={() => navigate(-1)}>
//           Back
//         </button>
//       </div>

//       {result?.n8nResponse && formatN8N(result.n8nResponse)}
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

//   const [answer, setAnswer] = useState("");
//   const [structured, setStructured] = useState({});
//   const [question, setQuestion] = useState("");
//   const [summary, setSummary] = useState("");  // <-- Added properly
//   const [metadata, setMetadata] = useState({});

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const raw = localStorage.getItem("notifyPayload");
//     if (!raw) return;

//     try {
//       const parsed = JSON.parse(raw);

//       setEmail(parsed.email || "");
//       setSubject(parsed.subject || "");
//       setBody(parsed.body || "");      // <-- Manual body comes here
//       setSummary(parsed.summary || ""); // <-- Also carry summary

//       setAnswer(parsed.answer || "");
//       setStructured(parsed.structured || {});
//       setQuestion(parsed.question || "");
//       setMetadata(parsed.metadata || {});
//     } catch (err) {
//       console.error("Invalid notifyPayload:", err);
//     }
//   }, []);

//   async function send() {
//     if (!email.trim()) {
//       alert("Recipient email is required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         email,
//         subject: subject || "No subject",
//         body,       // <-- IMPORTANT FIX: This is the real user body
//         summary,    // <-- AI summary (optional)
//         answer,
//         structured,
//         question,
//         metadata
//       };

//       const res = await API.post("/api/notify", payload);
//       setResult(res.data);

//       localStorage.setItem("lastNotifyResponse", JSON.stringify(res.data, null, 2));
//     } catch (err) {
//       console.error("Email send error:", err);
//       alert("Failed to send email");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="card p-4">
//       <h2 className="mb-4">Email Editor</h2>

//       <label>Recipient Email</label>
//       <input
//         className="form-control mb-2"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <label>Subject</label>
//       <input
//         className="form-control mb-2"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       />

//       <label>Body (HTML or Plain Text)</label>
//       <textarea
//         className="form-control mb-3"
//         rows="10"
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//       />

//       <div className="d-flex gap-2">
//         <button className="btn btn-success" onClick={send} disabled={loading}>
//           {loading ? "Sending..." : "Send Email"}
//         </button>

//         <button className="btn btn-secondary" onClick={() => navigate(-1)}>
//           Back
//         </button>
//       </div>

//       {result?.n8nResponse && (
//         <div className="mt-4 p-3 border rounded bg-light">
//           <h5 className="fw-bold mb-3">n8n Email Response</h5>

//           {result.n8nResponse.status && <p><strong>Status:</strong> {result.n8nResponse.status}</p>}
//           {result.n8nResponse.message && <p><strong>Message:</strong> {result.n8nResponse.message}</p>}
//           {result.n8nResponse.subject && <p><strong>Subject:</strong> {result.n8nResponse.subject}</p>}
//           {result.n8nResponse.emailSentTo && <p><strong>Sent To:</strong> {result.n8nResponse.emailSentTo}</p>}

//           {result.n8nResponse.body && (
//             <>
//               <strong>Email Body:</strong>
//               <pre className="p-3 mt-2 bg-white border rounded" style={{ whiteSpace: "pre-wrap" }}>
//                 {result.n8nResponse.body}
//               </pre>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




























import React, { useEffect, useState } from "react";
import API from "../api/backend";
import { useNavigate } from "react-router-dom";

export default function Notify() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [answer, setAnswer] = useState("");
  const [structured, setStructured] = useState({});
  const [question, setQuestion] = useState("");
  const [summary, setSummary] = useState("");  
  const [metadata, setMetadata] = useState({});

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("notifyPayload");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      setEmail(parsed.email || "");
      setSubject(parsed.subject || "");
      setBody(parsed.body || "");
      setSummary(parsed.summary || "");

      setAnswer(parsed.answer || "");
      setStructured(parsed.structured || {});
      setQuestion(parsed.question || "");
      setMetadata(parsed.metadata || {});
    } catch (err) {
      console.error("Invalid notifyPayload:", err);
    }
  }, []);

  async function send() {
    if (!email.trim()) {
      alert("Recipient email is required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email,
        subject: subject || "No subject",
        body,       
        summary,    
        answer,
        structured,
        question,
        metadata
      };

      const res = await API.post("/api/notify", payload);
      setResult(res.data);

      localStorage.setItem("lastNotifyResponse", JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error("Email send error:", err);
      alert("Failed to send email");
    }

    setLoading(false);
  }

  return (
    <div className="card p-4">
      <h2 className="mb-4">Email Editor</h2>

      <label>Recipient Email</label>
      <input
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Subject</label>
      <input
        className="form-control mb-2"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <label>Body (HTML or Plain Text)</label>
      <textarea
        className="form-control mb-3"
        rows="10"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="d-flex gap-2">
        <button className="btn btn-success" onClick={send} disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </button>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      {result?.n8nResponse && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h5 className="fw-bold mb-3">n8n Email Response</h5>

          {result.n8nResponse.status && <p><strong>Status:</strong> {result.n8nResponse.status}</p>}
          {result.n8nResponse.message && <p><strong>Message:</strong> {result.n8nResponse.message}</p>}
          {result.n8nResponse.subject && <p><strong>Subject:</strong> {result.n8nResponse.subject}</p>}
          {result.n8nResponse.emailSentTo && <p><strong>Sent To:</strong> {result.n8nResponse.emailSentTo}</p>}

          {result.n8nResponse.body && (
            <>
              <strong>Email Body:</strong>
              <pre className="p-3 mt-2 bg-white border rounded" style={{ whiteSpace: "pre-wrap" }}>
                {result.n8nResponse.body}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

