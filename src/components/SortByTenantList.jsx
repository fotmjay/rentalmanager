import TenantCard from "./TenantCard";
import { formatAddress } from "../config/formats";
import { useEffect } from "react";

export default function SortByTenantList(props) {
  function generateTenantCards() {
    const addressCache = {};
    props.addList.forEach((add) => {
      addressCache[add._id] = `${formatAddress(add.streetNumber, add.appNumber)} ${add.streetName}`;
    });
    const sorted = props.tenantList.sort((a, b) => b.lastName - a.lastName);
    return sorted.map((tenant) => (
      <TenantCard addressCache={addressCache} addressInfo={props.addList} tenantInfo={tenant} />
    ));
  }

  return (
    <div className="appList--sortByTenant--container">
      <ul>{generateTenantCards()}</ul>
    </div>
  );
}
