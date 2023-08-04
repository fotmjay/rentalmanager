import { formatAddress } from "../config/formats";

export default function AppCard(props) {
  //Setting props into appInfo
  //Note:  The array containing the tenant OBJECTS is under props.tenants
  const appInfo = props.appInfo;

  // Creating the address tag
  const formatNumber = formatAddress(appInfo.streetNumber, appInfo.appNumber);

  // Creating the tenants list
  const tenantsListElement = props.tenants.map((tenant) => {
    const name = `${tenant.firstName} ${tenant.lastName}`;
    return (
      <h3 onClick={(e) => props.openSpecific(appInfo, tenant, "tenant", e)} className="appCard--name" key={tenant._id}>
        {name}
      </h3>
    );
  });

  return (
    <div className="appCard--container">
      {!appInfo.leased && <h4 className="appCard--forLease">VACANT</h4>}
      {appInfo.alerts.length > 0 && <h4 className="appCard--alerts">&#10071;</h4>}
      <h3 className="appCard--address" onClick={(e) => props.openSpecific(appInfo, props.tenants, "address", e)}>
        {appInfo.streetName}
        <br />
        {formatNumber}
      </h3>
      {tenantsListElement}
    </div>
  );
}
