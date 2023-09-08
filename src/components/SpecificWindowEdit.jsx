import TenantForm from "./inputForms/TenantForm";
import AddressForm from "./inputForms/AddressForm";

export default function SpecificWindowEdit(props) {
  if (props.category === "tenant") {
    return (
      <div className="editWindow--formContainer">
        <TenantForm token={props.token} addressList={props.addressList} editMode={true} tenant={props.tenants} />
      </div>
    );
  } else {
    return (
      <div className="editWindow--formContainer">
        <AddressForm token={props.token} tenantList={props.tenantList} editMode={true} address={props.address} />
      </div>
    );
  }
}
