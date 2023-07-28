export default function Notes(props) {
  return (
    <>
      <h3 className="specificWindow--notes--title">Notes</h3>
      <div className="specificWindow--notes">{props.notes}</div>
    </>
  );
}
