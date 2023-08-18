import AuthPage from "./components/mainPages/AuthPage";
import Dashboard from "./components/mainPages/Dashboard";
import LandingPage from "./components/mainPages/LandingPage";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  // const [loggedIn, setLoggedIn] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route
            exact
            path="/login"
            element={<AuthPage register={false} errorMessages={errorMessages} setErrorMessages={setErrorMessages} />}
          ></Route>
          <Route
            exact
            path="/register"
            element={<AuthPage register={true} errorMessages={errorMessages} setErrorMessages={setErrorMessages} />}
          ></Route>
          <Route
            exact
            path="/dashboard"
            element={<Dashboard errorMessages={errorMessages} setErrorMessages={setErrorMessages} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
