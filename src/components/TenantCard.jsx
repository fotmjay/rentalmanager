export default function TenantCard(props) {
  console.log(props);
  return (
    <li key={props.tenantInfo._id} className="appList--sortByTenant--TenantCard">
      <span>{props.tenantInfo.lastName}</span>
      <span>{props.tenantInfo.firstName}</span>
      <span>{props.addressCache[props.tenantInfo.addressId]}</span>
    </li>
  );
}
