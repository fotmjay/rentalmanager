import { useEffect } from "react";
import { formatAddress, formatName } from "../config/formats";
import TenantList from "../components/TenantList";
import RentInfo from "../components/RentInfo";
import Alerts from "../components/Alerts";
import Notes from "../components/Notes";
import Contact from "../components/Contact";

export default function SpecificWindow(props) {
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

  const addressInfo = props.address;
  const tenantsInfo = props.tenants;
  console.log(tenantsInfo);

  return (
    <div className="specificWindow--container">
      <h2 className="specificWindow--title">Details</h2>
      {props.category === "address" && (
        <h1 className="specificWindow--headline">
          {formatAddress(addressInfo.streetNumber, addressInfo.appNumber)}
          <br />
          {addressInfo.streetName}
        </h1>
      )}
      {props.category === "tenant" && (
        <h1 className="specificWindow--headline">
          {formatName(tenantsInfo.firstName, tenantsInfo.lastName)}
          <br />
          {tenantsInfo.birthDate}
        </h1>
      )}
      <ul className="specificWindow--detailsList">
        {props.category === "address" && (
          <>
            <TenantList tenants={tenantsInfo} />
            <Alerts address={addressInfo} />
            <RentInfo address={addressInfo} />
          </>
        )}
        {props.category === "tenant" && (
          <>
            <Contact tenant={tenantsInfo} />
          </>
        )}

        <Notes notes={props.category === "address" ? addressInfo.notes : tenantsInfo.notes} />
      </ul>
    </div>
  );
}
//
