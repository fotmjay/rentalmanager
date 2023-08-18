export default function Alert(props) {
  const alerts = props.address.alerts;
  return alerts.map((alert, i) => (
    <li className="specificWindow--alerts" key={i}>
      <span>
        {alert.title}
        {alert.data && ":"}
      </span>{" "}
      {alert.data}
    </li>
  ));
}
