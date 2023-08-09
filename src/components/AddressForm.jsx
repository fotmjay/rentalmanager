import { useState } from "react";
import { nanoid } from "nanoid";
import AlertField from "./AlertField";

export default function AddressForm(props) {
  const [confirmation, setConfirmation] = useState("");
  const [formData, setFormData] = useState({
    streetName: "",
    appNumber: "",
    streetNumber: "",
    tenantList: [],
    rentPrice: "",
    alerts: [{ title: "", desc: "" }],
    leased: true,
    notes: "",
  });

  const [selectedTenant, setSelectedTenant] = useState("");

  function handleChange(event) {
    const { name, value, type, dataset } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: !prevData[name] }));
    } else if (name === "alertTitle" || name === "alertDescription") {
      const propName = name === "alertTitle" ? "title" : "desc";
      setFormData((prevData) => {
        const alerts = prevData.alerts.map((element, index) => {
          if (index === Number(dataset.index)) {
            return { ...prevData.alerts[dataset.index], [propName]: value };
          } else {
            return element;
          }
        });
        prevData = { ...prevData, alerts: alerts };
        return prevData;
      });
    } else if (name === "selectedTenant") {
      setSelectedTenant(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }

  async function submitAddress(event) {
    event.preventDefault();
    let alerts;
    if (!formData.alerts[0].title && !formData.alerts[0].desc) {
      alerts = [];
    } else {
      alerts = formData.alerts;
    }
    const response = await fetch("http://localhost:3000/api/createAddress", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json", authorization: props.token },
      mode: "cors",
      credentials: "same-origin",
      proxy: "http://localhost:3000",
      body: JSON.stringify({
        address: { ...formData, alerts: alerts },
      }),
    });
    const res = await response.json();
    if (res.success) {
      setConfirmation(res.message);
    } else {
      setConfirmation(res.error);
    }
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
        handleChange={handleChange}
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
        <label htmlFor="streetName">Street Name:</label>
        <input
          onChange={handleChange}
          value={formData.streetName}
          type="text"
          name="streetName"
          id="streetName"
        ></input>
        <br />
        <label htmlFor="streetNumber">Street Number:</label>
        <input
          onChange={handleChange}
          value={formData.streetNumber}
          type="text"
          name="streetNumber"
          id="streetNumber"
        ></input>
        <br />
        <label htmlFor="appNumber">App number:</label>
        <input onChange={handleChange} value={formData.appNumber} type="text" name="appNumber" id="appNumber"></input>
        <br />
        <label htmlFor="rentPrice">Rent Price:</label>
        <input onChange={handleChange} value={formData.rentPrice} type="text" name="rentPrice" id="rentPrice"></input>
        <br />
        <label htmlFor="notes">Notes:</label>
        <input onChange={handleChange} value={formData.notes} type="text" name="notes" id="notes"></input>
        <br />
        {generateAlertFields()}
        <label htmlFor="currentTenant">Current tenant:</label>
        <select onChange={handleChange} name="selectedTenant" id="selectedTenant">
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
        <label htmlFor="leased">Leased:</label>
        <input onChange={handleChange} type="checkbox" checked={formData.leased} name="leased" id="leased"></input>
        <br />
        <button className="editWindow--submitButton" type="submit">
          Add!
        </button>
      </form>
      {confirmation && confirmation}
    </section>
  );
}
