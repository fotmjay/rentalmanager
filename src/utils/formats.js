function formatAddress(streetNumber, app) {
  return app ? `${app}-${streetNumber}` : streetNumber;
}

function stringifyPhoneNumber(phoneList) {
  let str = "";
  for (let num in phoneList) {
    if (phoneList[num]) {
      str = str ? `${str} || ${num}: ${phoneList[num]}` : `${num}: ${phoneList[num]}`;
    }
  }
  return str;
}

function formatName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

export { formatAddress, stringifyPhoneNumber, formatName };
