import handleChangeFunctions from "../../utils/handleChangeFunctions";

export default function AlertField(props) {
  const { handleChange } = handleChangeFunctions;
  return (
    <>
      <label htmlFor="alert">{`Alert ${props.dataIndex + 1}:`}</label>
      <div className="editWindow--phoneFieldDiv">
        <input
          data-index={props.dataIndex}
          onChange={(e) => handleChange(e, props.setStateFn)}
          name="alertTitle"
          id="alertTitle"
          value={props.title}
          placeholder="Title"
        ></input>
        <input
          data-index={props.dataIndex}
          onChange={(e) => handleChange(e, props.setStateFn)}
          value={props.desc}
          type="text"
          name="alertDescription"
          placeholder="Description"
        ></input>
        {props.dataIndex === 0 ? (
          <button data-index={props.dataIndex} onClick={(e) => props.manageAlertFields("ADD", e)} type="button">
            +
          </button>
        ) : (
          <button data-index={props.dataIndex} onClick={(e) => props.manageAlertFields("REMOVE", e)} type="button">
            -
          </button>
        )}
      </div>
      <br />
    </>
  );
}
