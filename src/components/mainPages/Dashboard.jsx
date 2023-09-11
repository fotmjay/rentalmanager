import { useState, useEffect } from "react";
import AppCard from "../dashboardComponents/AppCard";
import SpecificWindow from "../SpecificWindow";
import CreateWindow from "../CreateWindow";
import Logo from "../dashboardComponents/Logo";
import SortByTenantList from "../dashboardComponents/SortByTenantList";
import fetchConfig from "../../config/fetch";
import fetchUrls from "../../constants/fetchUrls";
import { useNavigate } from "react-router-dom";

export default function Dashboard(props) {
  const [addList, setAddList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [sortByTenant, setSortByTenant] = useState(false);
  const [specWindow, setSpecWindow] = useState({ toggle: false, address: "", tenants: "", category: "" });
  const [createWindow, setCreateWindow] = useState({ toggle: false });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    refreshAll();
  }, []);

  function logOut(code) {
    localStorage.removeItem("token");
    setToken("");
    if (code) {
      props.setErrorMessages([{ message: "Please log in." }]);
      navigate("/login");
    } else {
      props.setErrorMessages([{ message: "Successfully logged out." }]);
      navigate("/");
    }
  }

  async function refreshData(type) {
    try {
      const response = await fetch(`${fetchUrls.getData}/${type}`, fetchConfig.dataRequest(token));
      const res = await response.json();
      if (res.success === true) {
        localStorage.setItem("token", res.refreshToken);
        setToken(res.refreshToken);
        if (type === "address") {
          setAddList(res.data);
        } else if (type === "tenant") {
          setTenantList(res.data);
        }
      } else {
        setAddList([]);
        setTenantList([]);
        logOut(401);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function refreshAll() {
    refreshData("address");
    refreshData("tenant");
  }

  function openSpecificWindow(address, tenants, category, e) {
    e.stopPropagation();
    setSpecWindow({ toggle: true, address: address, tenants: tenants, category: category });
  }

  function openCreateWindow(e) {
    e.stopPropagation();
    setCreateWindow({ toggle: true });
  }

  function closeWindow() {
    setSpecWindow({ toggle: false, address: "", tenants: "", category: "" });
    setCreateWindow({ toggle: false });
  }

  function sortTenant() {
    setSortByTenant((oldSort) => !oldSort);
  }

  // Creating individual appartment cards
  function createAddressCards() {
    const addressElements = addList.map((app) => {
      return <AppCard key={app._id} appInfo={app} openSpecific={openSpecificWindow} tenants={app.tenantList} />;
    });
    return addressElements;
  }

  return (
    <main className="appList--container">
      <Logo />
      {specWindow.toggle && (
        <SpecificWindow
          token={token}
          tenants={specWindow.tenants}
          address={specWindow.address}
          category={specWindow.category}
          closeWindow={closeWindow}
          tenantList={tenantList}
          addList={addList}
        />
      )}
      {createWindow.toggle && (
        <CreateWindow token={token} tenantList={tenantList} addressList={addList} closeWindow={closeWindow} />
      )}
      <div className="appList--header--container">
        <div className="appList--sortSwitch--container">
          <label className="switch">
            <input onChange={sortTenant} checked={sortByTenant} name="sortByTenant" type="checkbox" />
            <span className="slider round"></span>
          </label>
          <h4 className="appList--sorted--text">{sortByTenant ? "Sort by tenants" : "Sort by Street Name"}</h4>
        </div>
        <button type="button" className="appList--refresh--button" onClick={refreshAll}>
          Refresh Data
        </button>
        <div className="appList--button--container">
          <button type="button" className="appList--edit--button" onClick={(e) => openCreateWindow(e)}>
            Add
          </button>
          <button type="button" className="appList--logOut--button login--toggleRegisterButton" onClick={logOut}>
            Log Out
          </button>
        </div>
      </div>
      <section className="appList--section">
        {sortByTenant ? (
          <SortByTenantList
            addList={addList}
            openSpecific={openSpecificWindow}
            closeWindow={closeWindow}
            tenantList={tenantList}
          />
        ) : (
          createAddressCards()
        )}
      </section>
    </main>
  );
}
