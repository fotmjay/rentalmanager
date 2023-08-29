import { useEffect, useState } from "react";
import { formatAddress } from "../../utils/formats";
import { nanoid } from "nanoid";
import PhoneField from "./PhoneField";
import fetchConfig from "../../config/fetch";
import fetchUrls from "../../constants/fetchUrls";
import handleChangeFunctions from "../../utils/handleChangeFunctions";

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
    addressId: "",
  });
  const [editId, setEditId] = useState("");

  const { handleChange } = handleChangeFunctions;

  useEffect(() => {
    if (props.editMode) {
      props.tenant.birthDate = props.tenant.birthDate.slice(0, 10);
      console.log(props.tenant);
      setFormData(props.tenant);
      setEditId(props.tenant._id);
    }
  }, [props.editMode]);

  async function submitTenant(event) {
    event.preventDefault();
    if (formData.addressId === "Not my tenant") {
      setFormData((oldData) => ({ ...oldData, addressId: "" }));
    }
    const response = await fetch(fetchUrls.createTenant, fetchConfig.postRequest(formData, props.token));
    const res = await response.json();
    localStorage.setItem("token", res.refreshToken);
    setConfirmation(res.message || res.error);
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
        handleChange={(e) => handleChange(e, setFormData)}
        value={phone.number}
        type={phone.type}
      />
    ));
    return phoneElements;
  }

  return (
    <section>
      <form onSubmit={submitTenant} className="editWindow--tenantForm">
        <label htmlFor="firstName">First Name:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.firstName}
          type="text"
          name="firstName"
          id="firstName"
        ></input>
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.lastName}
          type="text"
          name="lastName"
          id="lastName"
        ></input>
        <br />
        <label htmlFor="birthDate">Date of birth:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.birthDate}
          type="text"
          name="birthDate"
          id="birthDate"
        ></input>
        <br />
        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.email}
          type="email"
          name="email"
          id="email"
        ></input>
        <br />
        {generatePhoneFields()}
        <label htmlFor="notes">Notes:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.notes}
          type="text"
          name="notes"
          id="notes"
        ></input>
        <br />
        <label htmlFor="currentAddress">Current address:</label>
        <select
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.addressId}
          name="addressId"
          id="currentAddress"
        >
          <option value="">Not my tenant</option>
          {generateAddressList()}
        </select>
        <br />
        <label htmlFor="recommended">Recommended:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          type="checkbox"
          checked={formData.recommended}
          name="recommended"
          id="recommended"
        ></input>
        <br />
        <button className="editWindow--submitButton" type="submit">
          {props.editMode ? "Update" : "Add!"}
        </button>
      </form>
      {confirmation && confirmation}
    </section>
  );
}
