import { stringifyPhoneNumber } from "../config/formats";

export default function TenantList(props) {
  const tenants = props.tenants;

  return (
    <>
      {tenants.map((tenant, i) => (
        <li key={tenant.objectId} className="specificWindow--TenantList">
          <span className="specificWindow--tenantName">
            {tenant.firstName} {tenant.lastName}
          </span>
          <span className="specificWindow--tenantPhone">{stringifyPhoneNumber(tenant.phone)}</span>
        </li>
      ))}
    </>
  );
}
