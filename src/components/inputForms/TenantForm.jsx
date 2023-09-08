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

  const { handleChange } = handleChangeFunctions;

  useEffect(() => {
    if (props.editMode) {
      const tenant = {};
      for (let key in props.tenant) {
        if (props.tenant[key] === null) {
          tenant[key] = "";
        } else if (key === "birthDate") {
          tenant[key] = props.tenant.birthDate.slice(0, 10);
        } else {
          tenant[key] = props.tenant[key];
        }
      }
      setFormData(tenant);
    }
  }, [props.editMode]);

  async function submitTenant(event) {
    event.preventDefault();
    if (formData.addressId === "Not my tenant") {
      setFormData((oldData) => ({ ...oldData, addressId: "" }));
    }
    if (props.editMode) {
      const response = await fetch(
        `${fetchUrls.editTenant}${props.tenant._id}`,
        fetchConfig.updateRequest(formData, props.token)
      );
      const res = await response.json();
      if (res.refreshToken) {
        localStorage.setItem("token", res.refreshToken);
      }
      setConfirmation(res.message || res.error);
    } else {
      const response = await fetch(fetchUrls.createTenant, fetchConfig.postRequest(formData, props.token));
      const res = await response.json();
      if (res.refreshToken) {
        localStorage.setItem("token", res.refreshToken);
      }
      setConfirmation(res);
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
        handleChange={(e) => handleChange(e, setFormData)}
        value={phone.number}
        type={phone.type}
      />
    ));
    return phoneElements;
  }

  function createConfirmationMessage() {
    let className = "editWindow--confirmation ";
    if (confirmation.success === false) {
      className += "error";
      if (Array.isArray(confirmation.error)) {
        return confirmation.error.map((el, i) => (
          <span key={i} className={className}>
            {el.error}
          </span>
        ));
      } else {
        return <span className={className}>{confirmation.error}</span>;
      }
    } else {
      return <span className={className}>{confirmation.message}</span>;
    }
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
          placeholder="AAAA-MM-DD"
        ></input>
        <br />
        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.email}
          type="email"
          name="email"
          id="email"
          placeholder="email@email.com"
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
      {createConfirmationMessage()}
    </section>
  );
}
