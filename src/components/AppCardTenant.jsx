export default function AppCardTenant(props) {
  const name = `${props.firstName} ${props.lastName}`;
  return <h3 className="appCard--name">{name}</h3>;
}
