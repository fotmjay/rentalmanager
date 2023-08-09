import Login from "./components/Login";
import AppartmentList from "./components/AppartmentList";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  function notLogged(code) {
    localStorage.removeItem("token");
    setErrorMessages([{ message: "401: Unauthorized." }]);
    setLoggedIn("");
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
        <Login setLoggedIn={setLoggedIn} errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
      )}
      {loggedIn && (
        <AppartmentList
          logOut={setLoggedIn}
          token={loggedIn}
          notLogged={notLogged}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />
      )}
    </div>
  );
}

export default App;
