import { useState } from "react";

export default function Login(props) {
  const [formData, setFormData] = useState({ password: "", email: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function login(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
      proxy: "http://localhost:3000",
      body: JSON.stringify({
        username: "bobbybenassy",
        password: "testing1234",
      }), // body data type must match "Content-Type" header
    });
    const logged = await response.json(); // parses JSON response into native JavaScript objects
    if (logged.success === true) {
      localStorage.setItem("token", logged.token);
      props.setErrorMessages([]);
      props.setLoggedIn(logged.token);
    } else {
      localStorage.removeItem("token");
      props.setErrorMessages([{ message: logged.error }]);
    }
  }

  return (
    <div className="login--container">
      <section className="login--text">
        <h1 className="login--title">Rental Manager</h1>
        <p className="login--paragraph">Log in to access your account.</p>
        {props.errorMessages.length > 0 && <span className="login--error">{props.errorMessages[0].message}</span>}
      </section>
      <form onSubmit={login} className="login--form">
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
        <label htmlFor="password">Password:</label>
        <input
          value={formData.password}
          onChange={handleChange}
          name="password"
          id="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
