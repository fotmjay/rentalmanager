import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import WarningBanner from "./components/WarningBanner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WarningBanner />
    <App />
  </React.StrictMode>
);
