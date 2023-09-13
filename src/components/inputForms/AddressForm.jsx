import { useState, useEffect } from "react";
import AlertField from "./AlertField";
import fetchConfig from "../../config/fetch";
import fetchUrls from "../../constants/fetchUrls";
import validation from "../../utils/validation";
import handleChangeFunctions from "../../utils/handleChangeFunctions";

export default function AddressForm(props) {
  const [confirmation, setConfirmation] = useState("");
  const [formData, setFormData] = useState({
    streetName: "",
    appNumber: "",
    streetNumber: "",
    tenantList: [],
    rentPrice: "",
    alerts: [{ title: "", desc: "" }],
    notes: "",
  });

  const [selectedTenant, setSelectedTenant] = useState("");

  const { handleChange } = handleChangeFunctions;

  useEffect(() => {
    if (props.editMode) {
      const address = {};
      for (let key in props.address) {
        if (props.address[key] === null && key !== "alerts") {
          address[key] = "";
        } else {
          if (key === "alerts" && props.address[key].length === 0) {
            address[key] = [{ title: "", desc: "" }];
          } else {
            address[key] = props.address[key];
          }
        }
      }
      setFormData(address);
    }
  }, [props.editMode]);

  function submitForm(event) {
    event.preventDefault();
    const validationErrors = [];
    validation.address(formData, validationErrors);
    if (validationErrors.length > 0) {
      setConfirmation({ success: false, error: validationErrors });
    } else {
      // submitAddress();
      console.log("submitted");
    }
  }

  async function submitAddress() {
    // let alerts = [];
    // if (formData.alerts.length > 0) {
    //   formData.alerts.forEach((alert) => {
    //     const title = alert.title ? alert.title.trim() : "";
    //     const desc = alert.desc ? alert.desc.trim() : "";
    //     if (title || desc) {
    //       alerts.push({ title: title, desc: desc });
    //     }
    //   });
    // }
    // const addressData = { ...formData, alerts: alerts };
    // let response;
    // if (props.editMode) {
    //   response = await fetch(
    //     `${fetchUrls.editAddress}${props.address._id}`,
    //     fetchConfig.updateRequest(addressData, props.token)
    //   );
    // } else {
    //   response = await fetch(fetchUrls.createAddress, fetchConfig.postRequest(addressData, props.token));
    // }
    // const res = await response.json();
    // if (res.refreshToken) {
    //   localStorage.setItem("token", res.refreshToken);
    // }
    // setConfirmation(res);
  }

  function generateTenantList() {
    return (
      <>
        {props.tenantList.map((tenant) => (
          <option key={tenant._id} value={tenant._id}>{`${tenant.firstName} ${tenant.lastName} ${
            tenant.birthDate ? tenant.birthDate.toString().slice(0, 10) : ""
          }`}</option>
        ))}
      </>
    );
  }

  function manageAlertFields(ope, event) {
    if (ope === "ADD") {
      if (formData.alerts.length > 2) {
        setConfirmation({ success: false, error: "Max number of alerts reached." });
      } else {
        setFormData((oldData) => {
          return { ...oldData, alerts: [...oldData.alerts, { title: "", desc: "" }] };
        });
      }
    } else if (ope === "REMOVE") {
      setFormData((oldData) => {
        const filteredAlerts = oldData.alerts.filter((_, index) => index !== Number(event.target.dataset.index));
        return { ...oldData, alerts: filteredAlerts };
      });
      setConfirmation({});
    }
  }

  function addToList() {
    if (selectedTenant && !formData.tenantList.find((tenant) => tenant._id === selectedTenant)) {
      const getTenantObject = props.tenantList.find((tenant) => selectedTenant === tenant._id);
      setFormData((oldData) => ({ ...oldData, tenantList: [...oldData.tenantList, getTenantObject] }));
    }
  }

  function removeFromList(id) {
    setFormData((oldData) => {
      const newList = oldData.tenantList.filter((tenant) => tenant._id !== id);
      return { ...oldData, tenantList: newList };
    });
  }

  function generateAlertFields() {
    const alertElements = formData.alerts.map((alert, index) => (
      <AlertField
        key={index}
        manageAlertFields={manageAlertFields}
        dataIndex={index}
        setStateFn={setFormData}
        title={alert.title}
        desc={alert.desc}
        type={alert.type}
      />
    ));
    return alertElements;
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
      <form onSubmit={submitForm} className="editWindow--tenantForm">
        <label htmlFor="appNumber">App number:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.appNumber}
          type="text"
          name="appNumber"
          id="appNumber"
        ></input>
        <br />
        <label htmlFor="streetNumber">Street Number:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.streetNumber}
          type="text"
          name="streetNumber"
          id="streetNumber"
        ></input>
        <br />
        <label htmlFor="streetName">Street Name:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.streetName}
          type="text"
          name="streetName"
          id="streetName"
        ></input>
        <br />

        <label htmlFor="rentPrice">Rent Price:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.rentPrice}
          type="text"
          name="rentPrice"
          id="rentPrice"
        ></input>
        <br />
        <label htmlFor="notes">Notes:</label>
        <input
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.notes}
          type="text"
          name="notes"
          id="notes"
        ></input>
        <br />
        {generateAlertFields()}
        <label htmlFor="currentTenant">Current tenant:</label>
        <select
          onChange={(e) => handleChange(e, setFormData, setSelectedTenant)}
          name="selectedTenant"
          id="selectedTenant"
        >
          <option value=""></option>
          {generateTenantList()}
        </select>
        <button onClick={addToList} type="button">
          +
        </button>
        <br />
        <ul className="addressForm--selectedTenantList">
          {formData.tenantList.map((tenant) => (
            <li key={tenant._id} data-id={tenant._id}>
              {`${tenant.firstName} ${tenant.lastName} ${
                tenant.birthDate ? tenant.birthDate.toString().slice(0, 10) : ""
              }`}
              <span onClick={() => removeFromList(tenant._id)} className="edit addressForm--removeSelectedTenant">
                remove
              </span>
            </li>
          ))}
        </ul>
        <button className="editWindow--submitButton" type="submit">
          {props.editMode ? "Update" : "Add"}
        </button>
      </form>
      {createConfirmationMessage()}
    </section>
  );
}
