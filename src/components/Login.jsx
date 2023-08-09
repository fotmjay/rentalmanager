import { useState } from "react";

export default function Login(props) {
  const [formData, setFormData] = useState({ password: "", username: "", confirmPass: "", email: "" });
  const [registerForm, setRegisterForm] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function submitForm(event) {
    event.preventDefault();
    if (registerForm) {
      const validationErrors = [];
      if (formData.username.length < 5) {
        validationErrors.push({ message: "Username needs to be at least 6 characters." });
      }
      if (formData.password.length < 8) {
        validationErrors.push({ message: "Password needs to be at least 8 characters." });
      }
      if (formData.password !== formData.confirmPass || formData.password === "") {
        validationErrors.push({ message: "Passwords do not match." });
      }
      if (validationErrors.length > 0) {
        props.setErrorMessages(validationErrors);
      } else {
        register();
      }
    } else {
      login();
    }
  }

  async function login() {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
      proxy: "http://localhost:3000",
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }), // body data type must match "Content-Type" header
    });
    const logged = await response.json(); // parses JSON response into native JavaScript objects
    if (logged.success === true) {
      localStorage.setItem("token", logged.token);
      props.setErrorMessages([]);
      props.setLoggedIn(logged.token);
    } else {
      localStorage.removeItem("token");
      console.log(logged);
      props.setErrorMessages([{ message: logged.error }]);
    }
  }

  async function register() {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
        proxy: "http://localhost:3000",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPass: formData.confirmPass,
        }), // body data type must match "Content-Type" header
      });
      const register = await response.json(); // parses JSON response into native JavaScript objects

      if (register.success === true) {
        localStorage.setItem("token", register.token);
        props.setErrorMessages([]);
        props.setLoggedIn(register.token);
      } else {
        localStorage.removeItem("token");
        console.log(register);
        if (Array.isArray(register.error)) {
          const errors = register.error.map((err) => {
            return {
              message: err.message,
            };
          });
          props.setErrorMessages(errors);
        } else {
          props.setErrorMessages([{ message: register.error }]);
        }
      }
    } catch (err) {
      console.log("err:", err);
      props.setErrorMessages([{ message: err.error }]);
    }
  }

  function toggleRegisterForm() {
    setRegisterForm((toggle) => !toggle);
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
      <form onSubmit={submitForm} className="login--form">
        <label htmlFor="username">Username:</label>
        <input
          value={formData.username}
          onChange={handleChange}
          name="username"
          id="username"
          type="username"
          placeholder="Username"
        />
        <br />
        {registerForm && <label htmlFor="email">Email:</label>}
        {registerForm && (
          <input
            value={formData.email}
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
          />
        )}
        {registerForm && <br />}
        <label htmlFor="password">Password:</label>
        <input
          value={formData.password}
          onChange={handleChange}
          name="password"
          id="password"
          type="password"
          placeholder="Password"
        />
        {registerForm && <br />}
        {registerForm && <label htmlFor="confirmPass">Confirm:</label>}
        {registerForm && (
          <input
            value={formData.confirmPass}
            onChange={handleChange}
            name="confirmPass"
            id="confirmPass"
            type="password"
            placeholder="Confirm Password"
          />
        )}

        <div className="login--buttonContainer">
          <button type="submit" className="login--submitButton">
            Submit
          </button>
          <button type="button" className="login--toggleRegisterButton" onClick={toggleRegisterForm}>
            {registerForm ? "Already have an account" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
