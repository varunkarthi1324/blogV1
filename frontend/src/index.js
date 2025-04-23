import React from "react";
import ReactDOM from "react-dom/client"; // Use ReactDOM from "react-dom/client" for React 18+
import App from "./App";
import "./styles.css";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(<App />); // Render the App component
