const fetchConfig = {
  dataRequest: function (token) {
    return {
      headers: { "Content-Type": "application/json", authorization: token },
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
    };
  },
  postRequest: function (formData, token) {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token || "" },
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify({
        data: formData,
      }),
    };
  },
  updateRequest: function (formData, token) {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: token || "" },
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify({
        data: formData,
      }),
    };
  },
};

export default fetchConfig;
