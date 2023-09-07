import AuthPage from "./components/mainPages/AuthPage";
import Dashboard from "./components/mainPages/Dashboard";
import LandingPage from "./components/mainPages/LandingPage";
import { useState } from "react";
import { HashRouter, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [errorMessages, setErrorMessages] = useState([]);

  const token = localStorage.getItem("token");

  return (
    <HashRouter>
      <div>
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
    </HashRouter>
  );
}

export default App;
