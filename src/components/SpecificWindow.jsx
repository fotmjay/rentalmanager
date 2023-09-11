import { useEffect, useState } from "react";
import { formatAddress, formatName } from "../utils/formats";
import TenantList from "./specificWindowComponents/TenantList";
import RentInfo from "./specificWindowComponents/RentInfo";
import Alerts from "./specificWindowComponents/Alerts";
import Notes from "./specificWindowComponents/Notes";
import Contact from "./specificWindowComponents/Contact";
import SpecificWindowDetails from "./SpecificWindowDetails";
import SpecificWindowEdit from "./SpecificWindowEdit";

export default function SpecificWindow(props) {
  const [toggleEdit, setToggleEdit] = useState(false);

  const { tenants, address, category, closeWindow, token, tenantList, addList } = props;

  function editButton() {
    setToggleEdit((prev) => !prev);
  }

  return (
    <div className="specificWindow--container">
      <div className="specificWindow--title">
        <h2 className="specificWindow--title--text">
          Details
          <button onClick={editButton} className="appList--edit--button edit" type="button">
            {toggleEdit ? "Go back" : "Edit"}
          </button>
          <button onClick={props.closeWindow} className="appList--close--button" type="button">
            ✘
          </button>
        </h2>
      </div>

      {toggleEdit ? (
        <SpecificWindowEdit
          token={token}
          tenants={tenants}
          address={address}
          category={category}
          tenantList={tenantList}
          addressList={addList}
        />
      ) : (
        <SpecificWindowDetails token={token} tenants={tenants} address={address} category={category} />
      )}
    </div>
  );
}
//
