import { useState } from "react";
import { formatAddress } from "../config/formats";
import { nanoid } from "nanoid";
import PhoneField from "./PhoneField";

export default function TenantForm(props) {
  const [confirmation, setConfirmation] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phoneNumbers: [{ id: nanoid(), number: "", type: "home" }],
    recommended: true,
    notes: "",
    currentAddress: "",
  });

  function handleChange(event) {
    const { name, value, type, dataset } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: !prevData.recommended }));
    } else if (name === "phoneNumbers" || name === "phoneTypes") {
      const propName = name === "phoneNumbers" ? "number" : "type";
      setFormData((prevData) => {
        const phones = prevData.phoneNumbers.map((element) => {
          if (element.id === dataset.id) {
            return { ...prevData.phoneNumbers[dataset.index], [propName]: value };
          } else {
            return element;
          }
        });
        prevData = { ...prevData, phoneNumbers: phones };
        return prevData;
      });
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

  function managePhoneFields(ope, event) {
    if (ope === "ADD") {
      if (formData.phoneNumbers.length > 2) {
        setConfirmation("Max amount of numbers reached");
      } else {
        setFormData((oldData) => {
          return { ...oldData, phoneNumbers: [...oldData.phoneNumbers, { id: nanoid(), number: "", type: "home" }] };
        });
      }
    } else if (ope === "REMOVE") {
      setFormData((oldData) => {
        const phones = oldData.phoneNumbers.filter((phone) => phone.id !== event.target.dataset.id);
        return { ...oldData, phoneNumbers: phones };
      });
    }
  }

  function generatePhoneFields() {
    const phoneElements = formData.phoneNumbers.map((phone, index) => (
      <PhoneField
        key={phone.id}
        managePhoneFields={managePhoneFields}
        dataId={phone.id}
        dataIndex={index}
        handleChange={handleChange}
        value={phone.number}
        type={phone.type}
      />
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
        {generatePhoneFields()}
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
