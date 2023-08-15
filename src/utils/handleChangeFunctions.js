const handleChangeFunctions = {
  handleChange: function (event, setStateFn, setStateFnTwo) {
    const { name, value, type, dataset } = event.target;
    if (type === "checkbox") {
      setStateFn((prevData) => ({ ...prevData, [name]: !prevData[name] }));
    } else if (name === "phoneNumbers" || name === "phoneTypes") {
      const propName = name === "phoneNumbers" ? "number" : "type";
      phoneSpecificChanges(setStateFn, propName, value, dataset);
    } else if (name === "alertTitle" || name === "alertDescription") {
      const propName = name === "alertTitle" ? "title" : "desc";
      addressSpecificChanges(setStateFn, propName, value, dataset);
    } else if (name === "selectedTenant") {
      setStateFnTwo(value);
    } else {
      setStateFn((prevData) => ({ ...prevData, [name]: value }));
    }
  },
};

function phoneSpecificChanges(setStateFn, propName, value, dataset) {
  setStateFn((prevData) => {
    const phones = prevData.phoneNumbers.map((element) => {
      if (element.id === dataset.id) {
        return { ...prevData.phoneNumbers[dataset.index], [propName]: value };
      } else {
        return element;
      }
    });
    prevData = { ...prevData, phoneNumbers: phones };
    return prevData;
  });
}

function addressSpecificChanges(setStateFn, propName, value, dataset) {
  setStateFn((prevData) => {
    const alerts = prevData.alerts.map((element, index) => {
      if (index === parseInt(dataset.index, 10)) {
        return { ...prevData.alerts[dataset.index], [propName]: value };
      } else {
        return element;
      }
    });
    prevData = { ...prevData, alerts: alerts };
    return prevData;
  });
}

// function handleChange(event) {}

// function handleChange(event) {
//   const { name, value, type, dataset } = event.target;
//   if (type === "checkbox") {
//     setFormData((prevData) => ({ ...prevData, [name]: !prevData[name] }));
//   } else if (name === "alertTitle" || name === "alertDescription") {
//     const propName = name === "alertTitle" ? "title" : "desc";
//
//   }
//   } else {
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   }
// }
export default handleChangeFunctions;
