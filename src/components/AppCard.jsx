import AppCardTenant from "../components/AppCardTenant";

export default function AppCard(props) {
  //Setting props into appInfo
  //Note:  The array containing the tenant OBJECTS is under props.tenants
  const appInfo = props.appInfo;

  // Creating the address tag
  const formatAddress = `${appInfo.appNumber}-${appInfo.streetNumber} ${appInfo.streetName}`;

  // Creating the tenants list
  const tenantsList = props.tenants.map((tenant) => (
    <AppCardTenant key={tenant.objectId} firstName={tenant.firstName} lastName={tenant.lastName} />
  ));

  return (
    <div className="appCard--container">
      <h3 className="appCard--address">{formatAddress}</h3>
      {tenantsList}
    </div>
  );
}
