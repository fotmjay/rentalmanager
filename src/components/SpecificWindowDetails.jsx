import { useEffect, useState } from "react";
import { formatAddress, formatName } from "../utils/formats";
import TenantList from "./specificWindowComponents/TenantList";
import RentInfo from "./specificWindowComponents/RentInfo";
import Alerts from "./specificWindowComponents/Alerts";
import Notes from "./specificWindowComponents/Notes";
import Contact from "./specificWindowComponents/Contact";

export default function SpecificWindowDetails(props) {
  const addressInfo = props.address;
  const tenantsInfo = props.tenants;

  return (
    <div>
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
          {tenantsInfo.birthDate ? tenantsInfo.birthDate.toString().slice(0, 10) : ""}
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
