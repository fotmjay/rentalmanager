import { useState } from "react";
import AlertField from "./AlertField";
import fetchConfig from "../config/fetch";
import fetchUrls from "../constants/fetchUrls";
import handleChangeFunctions from "../utils/handleChangeFunctions";

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

  async function submitAddress(event) {
    event.preventDefault();
    let alerts;
    if (!formData.alerts[0].title && !formData.alerts[0].desc) {
      alerts = [];
    } else {
      alerts = formData.alerts;
    }
    const addressData = { ...formData, alerts: alerts };
    const response = await fetch(fetchUrls.createAddress, fetchConfig.postRequest(addressData, props.token));
    const res = await response.json();
    localStorage.setItem("token", res.refreshToken);
    setConfirmation(res.message || res.error);
  }

  function generateTenantList() {
    return (
      <>
        {props.tenantList.map((tenant) => (
          <option key={tenant._id} value={tenant._id}>{`${tenant.firstName} ${tenant.lastName} ${tenant.birthDate
            .toString()
            .slice(0, 10)}`}</option>
        ))}
      </>
    );
  }

  function manageAlertFields(ope, event) {
    if (ope === "ADD") {
      if (formData.alerts.length > 2) {
        setConfirmation("Max amount of alerts reached");
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
  return (
    <section>
      <form onSubmit={submitAddress} className="editWindow--tenantForm">
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
              {`${tenant.firstName} ${tenant.lastName} ${tenant.birthDate.toString().slice(0, 10)}`}
              <span onClick={() => removeFromList(tenant._id)} className="edit addressForm--removeSelectedTenant">
                remove
              </span>
            </li>
          ))}
        </ul>
        <button className="editWindow--submitButton" type="submit">
          Add!
        </button>
      </form>
      {confirmation && confirmation}
    </section>
  );
}
