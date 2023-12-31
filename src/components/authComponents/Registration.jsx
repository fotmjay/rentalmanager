import { useState } from "react";
import fetchConfig from "../../config/fetch";
import fetchUrls from "../../constants/fetchUrls";
import handleChangeFunctions from "../../utils/handleChangeFunctions";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/validation";

export default function Registration(props) {
  const [formData, setFormData] = useState({ password: "", username: "", confirmPass: "", email: "" });
  const { handleChange } = handleChangeFunctions;

  const navigate = useNavigate();

  async function submitForm(event) {
    event.preventDefault();
    const validationErrors = [];
    validation.register(formData, validationErrors);
    if (validationErrors.length > 0) {
      props.setErrorMessages(validationErrors);
    } else {
      register();
    }
  }

  async function register() {
    try {
      const response = await fetch(fetchUrls.register, fetchConfig.postRequest(formData));
      const register = await response.json();
      if (register.success === true) {
        localStorage.setItem("token", register.token);
        props.setErrorMessages([]);
        navigate("/dashboard");
      } else {
        localStorage.removeItem("token");
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
      props.setErrorMessages([{ message: err.error }]);
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
      <label htmlFor="email">Email:</label>
      <input
        value={formData.email}
        onChange={(e) => handleChange(e, setFormData)}
        name="email"
        id="email"
        type="email"
        placeholder="Email"
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
      <br />
      <label htmlFor="confirmPass">Confirm:</label>
      <input
        value={formData.confirmPass}
        onChange={(e) => handleChange(e, setFormData)}
        name="confirmPass"
        id="confirmPass"
        type="password"
        placeholder="Confirm Password"
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
