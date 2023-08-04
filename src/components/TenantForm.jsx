import { useState } from "react";
import { formatAddress } from "../config/formats";
import { nanoid } from "nanoid";
import CONSTANTS from "../constants/constants";

export default function TenantForm(props) {
  const [confirmation, setConfirmation] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([{ id: nanoid(), type: "", number: "" }]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phoneNumbers: phoneNumbers,
    recommended: true,
    notes: "",
    currentAddress: "",
  });

  function handleChange(event) {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: !prevData.recommended }));
    } else if (name === "phoneNumbers") {
      console.log(event, name, value);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }

  async function submitTenant(event) {
    event.preventDefault();
    if (formData.currentAddress === "Not my tenant") {
      setFormData((oldData) => ({ ...oldData, currentAddress: "" }));
    }
    const response = await fetch("http://localhost:3000/api/createTenant", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json", authorization: props.token },
      mode: "cors",
      credentials: "same-origin",
      proxy: "http://localhost:3000",
      body: JSON.stringify({
        tenant: formData,
      }),
    });
    const res = await response.json();
    if (res.success) {
      setConfirmation(res.message);
    } else {
      setConfirmation(res.error);
    }
  }

  function generateAddressList() {
    return (
      <>
        {props.addressList.map((address) => (
          <option key={address._id} value={address._id}>{`${formatAddress(address.streetNumber, address.appNumber)} ${
            address.streetName
          }`}</option>
        ))}
      </>
    );
  }
  function phoneFields() {
    const phoneElements = phoneNumbers.map((phone) => (
      <div className="editWindow--phoneFieldDiv" key={phone.id}>
        <input onChange={handleChange} value={phone.number} type="text" name="phoneNumbers"></input>
        <select onChange={handleChange} name="phoneTypes" id="phoneTypes">
          {CONSTANTS.PHONETYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    ));
    return phoneElements;
  }

  //   <>
  //         <input
  //           key={phone.id}
  //           onChange={handleChange}
  //           value={phone.number}
  //           type="text"
  //           name="phoneNumbers"
  //           id={i === 0 ? "phoneNumbers" : `phoneNumbers${i}`}
  //         ></input>
  //
  //       </>

  return (
    <section>
      <form onSubmit={submitTenant} className="editWindow--tenantForm">
        <label htmlFor="firstName">First Name:</label>
        <input onChange={handleChange} value={formData.firstName} type="text" name="firstName" id="firstName"></input>
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input onChange={handleChange} value={formData.lastName} type="text" name="lastName" id="lastName"></input>
        <br />
        <label htmlFor="birthDate">Date of birth:</label>
        <input onChange={handleChange} value={formData.birthDate} type="text" name="birthDate" id="birthDate"></input>
        <br />
        <label htmlFor="email">Email:</label>
        <input onChange={handleChange} value={formData.email} type="email" name="email" id="email"></input>
        <br />
        <label htmlFor="phoneNumbers">Phone numbers:</label>
        {phoneFields()}
        <br />
        <label htmlFor="notes">Notes:</label>
        <input onChange={handleChange} value={formData.notes} type="text" name="notes" id="notes"></input>
        <br />
        <label htmlFor="currentAddress">Current address:</label>
        <select onChange={handleChange} value={formData.currentAddress} name="currentAddress" id="currentAddress">
          <option value="">Not my tenant</option>
          {generateAddressList()}
        </select>
        <br />
        <label htmlFor="recommended">Recommended:</label>
        <input
          onChange={handleChange}
          type="checkbox"
          checked={formData.recommended}
          name="recommended"
          id="recommended"
        ></input>
        <br />
        <button className="editWindow--submitButton" type="submit">
          Add!
        </button>
      </form>
      {confirmation && confirmation}
    </section>
  );
}
