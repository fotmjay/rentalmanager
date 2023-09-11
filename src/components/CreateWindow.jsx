import { useState, useEffect } from "react";
import TenantForm from "./inputForms/TenantForm";
import AddressForm from "./inputForms/AddressForm";

export default function CreateWindow(props) {
  const { addressList, tenantList, token } = props;
  const [createByTenant, setCreateByTenant] = useState(false);

  function toggleCreate() {
    setCreateByTenant((oldSort) => !oldSort);
  }

  return (
    <div className="specificWindow--container">
      <h2 className="specificWindow--title--text edit">
        Add
        <button onClick={props.closeWindow} className="appList--close--button" type="button">
          ✘
        </button>
      </h2>

      <div className="appList--sortSwitch--container">
        <div className="appList--sortSwitch--container">
          <label className="edit--switch switch">
            <input onChange={toggleCreate} checked={createByTenant} name="createByTenant" type="checkbox" />
            <span className="slider round"></span>
          </label>
          <span>{createByTenant ? "Tenant" : "Address"}</span>
        </div>
      </div>

      <div className="editWindow--formContainer">
        {createByTenant ? (
          <TenantForm token={token} addressList={addressList} />
        ) : (
          <AddressForm token={token} tenantList={tenantList} />
        )}
      </div>
    </div>
  );
}
