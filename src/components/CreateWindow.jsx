import { useState, useEffect } from "react";
import TenantForm from "./inputForms/TenantForm";
import AddressForm from "./inputForms/AddressForm";

export default function CreateWindow(props) {
  const { addressList, tenantList, token } = props;
  const [createByTenant, setCreateByTenant] = useState(false);
  useEffect(() => {
    function close(e) {
      props.closeWindow(e);
    }
    document.querySelector("body").addEventListener("click", close);
    // cleanup this component
    return () => {
      document.querySelector("body").removeEventListener("click", close);
    };
  }, []);

  function toggleCreate() {
    setCreateByTenant((oldSort) => !oldSort);
  }

  return (
    <div className="specificWindow--container">
      <h2 className="specificWindow--title edit">{createByTenant ? "Add tenant" : "Add address"}</h2>
      <div className="appList--sortSwitch--container">
        <div className="appList--sortSwitch--container">
          <label className="edit--switch switch">
            <input onChange={toggleCreate} checked={createByTenant} name="createByTenant" type="checkbox" />
            <span className="slider round"></span>
          </label>
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
