export default function TenantCard(props) {
  const style = props.evenIndex ? "appList--sortByTenant--TenantCard" : "appList--sortByTenant--TenantCard dark";
  return (
    <li onClick={props.onClick} className={style}>
      <span>{props.tenantInfo.lastName}</span>
      <span>{props.tenantInfo.firstName}</span>
      <span className="tenantCard--address">{props.addressCache[props.tenantInfo.addressId]}</span>
    </li>
  );
}
