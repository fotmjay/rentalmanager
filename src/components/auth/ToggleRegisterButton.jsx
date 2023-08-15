export default function ToggleRegisterButton(props) {
  return (
    <button type="button" className="login--toggleRegisterButton" onClick={props.toggleRegisterForm}>
      {props.registerForm ? "Already have an account" : "Register"}
    </button>
  );
}
