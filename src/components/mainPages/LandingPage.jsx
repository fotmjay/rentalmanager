import { useNavigate } from "react-router-dom";

export default function LandingPage(props) {
  const navigate = useNavigate();

  function buttonClick(action) {
    if (action === "login") {
      if (localStorage.getItem("token")) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } else if (action === "register") {
      navigate("/register");
    }
  }

  return (
    <div className="landing--container">
      <section className="login--text">
        <h1 className="login--title">Rental Manager</h1>
        <h2 className="landing--welcome">Welcome!</h2>
        <p className="landing--paragraph">
          Rental Manager is a web application designed to assist landlords in efficiently managing their rental
          properties.
        </p>
        <p className="landing--paragraph">
          With Rental Manager, landlords can easily add, organize, and access information about their properties,
          including addresses, rents, alerts, notes, and tenants.
        </p>
        <div className="login--buttonContainer login--form">
          <button
            onClick={() => {
              buttonClick("login");
            }}
            className="login--submitButton"
          >
            Log in
          </button>
          <button
            onClick={() => {
              buttonClick("register");
            }}
            className="login--submitButton"
          >
            Register
          </button>
        </div>
      </section>
    </div>
  );
}
