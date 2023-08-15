import { stringifyPhoneNumber } from "../utils/formats";

export default function TenantList(props) {
  const tenants = props.tenants;

  return (
    <>
      {tenants.map((tenant, i) => (
        <li key={tenant._id} className="specificWindow--TenantList">
          <span className="specificWindow--tenantName">
            {tenant.firstName} {tenant.lastName}
          </span>
          <span className="specificWindow--tenantPhone">{stringifyPhoneNumber(tenant.phone)}</span>
        </li>
      ))}
    </>
  );
}
