const fetchConfig = {
  dataRequest: function (token) {
    let request = {
      headers: { "Content-Type": "application/json", authorization: token || "" },
      method: "GET",
      mode: "cors",
    };
    if (process.env.NODE_ENV === "development") {
      request = { ...request, credentials: "same-origin", proxy: "http://localhost:3000" };
    }
    return request;
  },
  postRequest: function (formData, token) {
    let request = {
      headers: { "Content-Type": "application/json", authorization: token || "" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        data: formData,
      }),
    };
    if (process.env.NODE_ENV === "development") {
      request = { ...request, credentials: "same-origin", proxy: "http://localhost:3000" };
    }
    return request;
  },
  updateRequest: function (formData, token) {
    let request = {
      headers: { "Content-Type": "application/json", authorization: token || "" },
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({
        data: formData,
      }),
    };
    if (process.env.NODE_ENV === "development") {
      request = { ...request, credentials: "same-origin", proxy: "http://localhost:3000" };
    }
    return request;
  },
};

export default fetchConfig;
