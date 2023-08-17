import TenantCard from "./TenantCard";
import { formatAddress } from "../utils/formats";

export default function SortByTenantList(props) {
  function generateTenantCards() {
    const addressCache = {};
    props.addList.forEach((add) => {
      addressCache[add._id] = `${formatAddress(add.streetNumber, add.appNumber)} ${add.streetName}`;
    });
    const sorted = [...props.tenantList].toSorted((a, b) => a.lastName.localeCompare(b.lastName));
    return sorted.map((tenant, i) => (
      <TenantCard
        onClick={(e) => props.openSpecific("", tenant, "tenant", e)}
        key={tenant._id}
        addressCache={addressCache}
        tenantInfo={tenant}
        evenIndex={i % 2 === 0}
      />
    ));
  }

  return (
    <div className="appList--sortByTenant--container">
      <ul>{generateTenantCards()}</ul>
    </div>
  );
}
