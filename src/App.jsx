import AuthPage from "./components/auth/AuthPage";
import AppartmentList from "./components/AppartmentList";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  function notLogged(code, error) {
    localStorage.removeItem("token");
    setLoggedIn("");
    setErrorMessages([{ message: `${code}: ${error}` }]);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(token);
    }
  }, []);

  return (
    <div>
      {!loggedIn && (
        <AuthPage setLoggedIn={setLoggedIn} errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
      )}
      {loggedIn && (
        <AppartmentList
          setLoggedIn={setLoggedIn}
          token={loggedIn}
          logOut={notLogged}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />
      )}
    </div>
  );
}

export default App;
