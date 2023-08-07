export default function Contact(props) {
  const phones = props.tenant.phoneNumbers.map((phone, i) => (
    <li key={i} className="specificWindow--contactList">
      {phone.type}: {phone.number}
    </li>
  ));
  return (
    <>
      {phones}
      {props.tenant.email && <li className="specificWindow--contactList">Email: {props.tenant.email}</li>}
      <li
        className={
          props.tenant.recommended
            ? "specificWindow--contactList--recommended"
            : "specificWindow--contactList--notRecommended"
        }
      >
        {props.tenant.recommended ? "Recommended" : "NOT recommended"}
      </li>
    </>
  );
}
