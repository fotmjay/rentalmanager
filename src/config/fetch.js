const fetchConfig = {
  dataRequest: function (token) {
    return {
      headers: { "Content-Type": "application/json", authorization: token },
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      proxy: "http://localhost:3000",
    };
  },
  dataCreation: function (token, formData) {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      mode: "cors",
      credentials: "same-origin",
      proxy: "http://localhost:3000",
      body: JSON.stringify({
        data: formData,
      }),
    };
  },
};

export default fetchConfig;
