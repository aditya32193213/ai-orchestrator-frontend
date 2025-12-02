// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { ThemeProvider } from "./context/themecontext.jsx";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <ThemeProvider>
//     <App />
//   </ThemeProvider>
// );



import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/themecontext";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
