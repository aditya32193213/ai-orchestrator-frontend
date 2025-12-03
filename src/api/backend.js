import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:10000" ;

const API = axios.create({
  baseURL: BASE,
  timeout: 60000,
  headers: {
  }
});

export default API;
