import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ password: "", email: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function login(event) {
    event.preventDefault();
    console.log("login");
  }
  return (
    <div className="login--container">
      <section className="login--text">
        <h1 className="login--title">Rental Manager</h1>
        <p className="login--paragraph">Log in to access your account.</p>
      </section>
      <form onSubmit={login} className="login--form">
        <label htmlFor="email">Email:</label>
        <input
          value={formData.email}
          onChange={handleChange}
          name="email"
          id="email"
          type="email"
          placeholder="Email"
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
