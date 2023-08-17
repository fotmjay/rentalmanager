import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchConfig from "../../config/fetch";
import fetchUrls from "../../constants/fetchUrls";
import handleChangeFunctions from "../../utils/handleChangeFunctions";

export default function Login(props) {
  const [formData, setFormData] = useState({ password: "", username: "" });
  const { handleChange } = handleChangeFunctions;

  const navigate = useNavigate();

  async function submitForm(event) {
    event.preventDefault();
    login();
  }

  async function login() {
    const response = await fetch(fetchUrls.login, fetchConfig.postRequest(formData));
    const logged = await response.json(); // parses JSON response into native JavaScript objects
    if (logged.success === true) {
      localStorage.setItem("token", logged.token);
      props.setErrorMessages([]);
      // props.setLoggedIn(logged.token);
      navigate("/dashboard");
    } else {
      localStorage.removeItem("token");
      props.setErrorMessages([{ message: logged.error }]);
    }
  }

  return (
    <form onSubmit={submitForm} className="login--form">
      <label htmlFor="username">Username:</label>
      <input
        value={formData.username}
        onChange={(e) => handleChange(e, setFormData)}
        name="username"
        id="username"
        type="username"
        placeholder="Username"
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        value={formData.password}
        onChange={(e) => handleChange(e, setFormData)}
        name="password"
        id="password"
        type="password"
        placeholder="Password"
      />
      <div className="login--buttonContainer">
        <button type="submit" className="login--submitButton">
          Submit
        </button>
        {props.toggleButtonElement()}
      </div>
    </form>
  );
}
