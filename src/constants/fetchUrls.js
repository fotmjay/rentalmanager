let useUrl;
if (process.env.NODE_ENV === "development") {
  useUrl = "http://localhost:3000";
} else {
  useUrl = "https://rentalbackend.onrender.com";
}

const fetchUrls = {
  register: `${useUrl}/register`,
  login: `${useUrl}/login`,
  getData: `${useUrl}/api`,
  createTenant: `${useUrl}/api/createTenant`,
  createAddress: `${useUrl}/api/createAddress`,
  editTenant: `${useUrl}/api/edit/tenant/`,
  editAddress: `${useUrl}/api/edit/address/`,
};

export default fetchUrls;
