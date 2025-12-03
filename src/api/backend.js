// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://ai-orchestrator-backend-f0k6.onrender.com",
// });

// export default API;



// //Back-end API for testing
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
// });

// export default API;




import axios from "axios";

const BASE = "http://localhost:10000"|| process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: BASE,
  timeout: 60000,
  headers: {
    // default headers — content-type will be set per request (form-data vs json)
  }
});

export default API;
