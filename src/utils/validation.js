import validator from "validator";

const validation = Object.freeze({
  address: (formData, validationErrors) => {
    console.log(formData);
    if (formData.streetNumber.trim() === "") {
      validationErrors.push({ error: "Please enter a street number." });
    }
    if (formData.appNumber !== "" && parseInt(formData.appNumber) !== formData.appNumber) {
      validationErrors.push({ error: "Rent price needs to be a number or left blank." });
    }
    if (formData.streetName.trim() === "") {
      validationErrors.push({ error: "Please enter a street name." });
    }
  },

  tenant: (formData, validationErrors) => {
    if (!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(formData.birthDate) && formData.birthDate !== "") {
      validationErrors.push({ error: "Date of birth needs to be a date or left blank. (AAAA-MM-JJ)" });
    }
    if (!validator.isEmail(formData.email) && formData.email !== "") {
      validationErrors.push({ error: "Please enter a valid email or leave blank." });
    }
    if (!formData.firstName || !formData.firstName.trim() === "") {
      validationErrors.push({ error: "Please enter a first name." });
    }
    if (!formData.lastName || !formData.lastName.trim() === "") {
      validationErrors.push({ error: "Please enter a last name." });
    }
    const wrongNumber = formData.phoneNumbers.some((phone) => {
      const number = phone.number.replace(/[^0-9]/g, "");
      if (number.toString().length !== 10) {
        return true;
      }
    });
    if (wrongNumber) {
      validationErrors.push({ error: "Please enter a valid phone number: 000-000-0000." });
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
