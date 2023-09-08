import validator from "validator";

const validation = Object.freeze({
  address: (address) => {},
  tenant: (formData, validationErrors) => {
    console.log(formData);
    if (!validator.isDate(formData.birthDate) && formData.birthDate !== "") {
      validationErrors.push({ error: "Date of birth needs to be a date or empty. (AAAA-MM-JJ)" });
    }
    if (!validator.isEmail(formData.email) && formData.email !== "") {
      validationErrors.push({ error: "Please enter a valid email or leave blank." });
    }
    if (!formData.firstName || !formData.firstName.trim()) {
      validationErrors.push({ error: "Please enter a first name." });
    }
    if (!formData.lastName || !formData.lastName.trim()) {
      validationErrors.push({ error: "Please enter a last name." });
    }
  },
  register: (formData, validationErrors) => {
    if (formData.username.length < 6) {
      validationErrors.push({ message: "Username needs to be at least 6 characters." });
    }
    if (formData.password.length < 8) {
      validationErrors.push({ message: "Password needs to be at least 8 characters." });
    }
    if (formData.password !== formData.confirmPass || formData.password === "") {
      validationErrors.push({ message: "Passwords do not match." });
    }
    if (!validator.isEmail(formData.email)) {
      validationErrors.push({ message: "Please enter a valid email address." });
    }
    return validationErrors;
  },
  login: (formData, validationErrors) => {
    if (formData.username.length < 6) {
      validationErrors.push({ message: "Username is at least 6 characters." });
    }
    if (formData.password.length < 8) {
      validationErrors.push({ message: "Password is at least 8 characters." });
    }
    return validationErrors;
  },
});

export default validation;
