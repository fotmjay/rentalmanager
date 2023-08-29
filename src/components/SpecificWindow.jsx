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

  // When specific window is open, set event listener to body
  // Leads to function that confirms:  Specific window clicked === do not close
  // anywhere else:  close
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

  function editButton() {
    setToggleEdit((prev) => !prev);
  }

  return (
    <div className="specificWindow--container">
      <h2 className="specificWindow--title">
        Details
        <button onClick={editButton} className="appList--edit--button" type="button">
          {toggleEdit ? "Go back" : "Edit"}
        </button>
      </h2>
      {toggleEdit ? (
        <SpecificWindowEdit
          token={token}
          tenants={tenants}
          address={address}
          category={category}
          closeWindow={closeWindow}
          tenantList={tenantList}
          addressList={addList}
        />
      ) : (
        <SpecificWindowDetails
          token={token}
          tenants={tenants}
          address={address}
          category={category}
          closeWindow={closeWindow}
        />
      )}
    </div>
  );
}
//
