import React from "react";
import ReactDOM from "react-dom/client"; // Use ReactDOM from "react-dom/client" for React 18+
import App from "./App";
import "./styles.css";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.defaults.baseURL = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(<App />); // Render the App component
