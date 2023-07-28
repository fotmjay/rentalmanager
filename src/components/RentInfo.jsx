export default function RentInfo(props) {
  return (
    <li className="specificWindow--rentPrice">
      Rent Price: <span>{props.address.rentPrice}$</span>
    </li>
  );
}
