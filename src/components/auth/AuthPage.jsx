import { useState } from "react";
import ToggleRegisterButton from "./ToggleRegisterButton";
import Login from "./Login";
import Registration from "./Registration";

export default function AuthPage(props) {
  const [registerForm, setRegisterForm] = useState(props.register);

  function toggleRegisterForm() {
    setRegisterForm((toggle) => !toggle);
  }

  function toggleButtonElement() {
    return <ToggleRegisterButton registerForm={registerForm} toggleRegisterForm={toggleRegisterForm} />;
  }

  return (
    <div className="login--container">
      <section className="login--text">
        <h1 className="login--title">Rental Manager</h1>
        <p className="login--paragraph">
          {registerForm ? "Please create an account." : "Log in to access your account."}
        </p>
        {props.errorMessages.length > 0 &&
          props.errorMessages.map((error, i) => (
            <span key={i} className="login--error">
              {error.message}
            </span>
          ))}
      </section>
      {registerForm ? (
        <Registration
          setLoggedIn={props.setLoggedIn}
          errorMessages={props.errorMessages}
          setErrorMessages={props.setErrorMessages}
          toggleButtonElement={toggleButtonElement}
        />
      ) : (
        <Login
          setLoggedIn={props.setLoggedIn}
          errorMessages={props.errorMessages}
          setErrorMessages={props.setErrorMessages}
          toggleButtonElement={toggleButtonElement}
        />
      )}
    </div>
  );
}
