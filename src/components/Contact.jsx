export default function Contact(props) {
  const phones = Object.keys(props.tenant.phone).filter((key) => props.tenant.phone[key]);
  return (
    <>
      {phones.map((type) => (
        <li key={type} className="specificWindow--contactList">
          {type}: {props.tenant.phone[type]}
        </li>
      ))}
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
