import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-orchestrator-backend-f0k6.onrender.com",
});

export default API;
