import AuthPage from "./components/mainPages/AuthPage";
import Dashboard from "./components/mainPages/Dashboard";
import LandingPage from "./components/mainPages/LandingPage";
import WarningBanner from "./components/WarningBanner";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [errorMessages, setErrorMessages] = useState([]);

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="first--container">
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route
            exact
            path="/login"
            element={
              token ? (
                <Navigate replace to={"/dashboard"} />
              ) : (
                <AuthPage register={false} errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
              )
            }
          ></Route>
          <Route
            exact
            path="/register"
            element={<AuthPage register={true} errorMessages={errorMessages} setErrorMessages={setErrorMessages} />}
          ></Route>
          <Route
            exact
            path="/dashboard"
            element={
              token ? (
                <Dashboard errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
