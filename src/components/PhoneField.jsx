import { useState } from "react";
import CONSTANTS from "../constants/constants";

export default function PhoneField(props) {
  return (
    <>
      <label htmlFor="phoneNumbers">{`Phone ${props.dataIndex === 0 ? "number" : props.dataIndex + 1}:`}</label>
      <div className="editWindow--phoneFieldDiv">
        <input
          data-index={props.dataIndex}
          data-id={props.dataId}
          onChange={props.handleChange}
          value={props.value}
          type="text"
          name="phoneNumbers"
        ></input>
        <select
          data-id={props.dataId}
          data-index={props.dataIndex}
          onChange={props.handleChange}
          name="phoneTypes"
          id="phoneTypes"
          value={props.type}
        >
          {CONSTANTS.PHONETYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {props.dataIndex === 0 ? (
          <button data-id={props.dataId} onClick={(e) => props.managePhoneFields("ADD", e)} type="button">
            +
          </button>
        ) : (
          <button data-id={props.dataId} onClick={(e) => props.managePhoneFields("REMOVE", e)} type="button">
            -
          </button>
        )}
      </div>
      <br />
    </>
  );
}
