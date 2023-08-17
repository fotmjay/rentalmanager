import { useState, useEffect } from "react";
import AppCard from "../components/AppCard";
import SpecificWindow from "../components/SpecificWindow";
import CreateWindow from "../components/CreateWindow";
import Logo from "../components/Logo";
import SortByTenantList from "./SortByTenantList";
import fetchConfig from "../config/fetch";
import fetchUrls from "../constants/fetchUrls";

export default function AppartmentList(props) {
  const [addList, setAddList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [sortByTenant, setSortByTenant] = useState(false);
  const [specWindow, setSpecWindow] = useState({ toggle: false, address: "", tenants: "", category: "" });
  const [createWindow, setCreateWindow] = useState({ toggle: false });

  async function refreshData(type) {
    try {
      const response = await fetch(`${fetchUrls.getData}/${type}`, fetchConfig.dataRequest(props.token));
      const res = await response.json();
      if (res.success === true) {
        if (res.refreshToken) {
          console.log(res);
          localStorage.setItem("token", res.refreshToken);
          props.setLoggedIn(res.refreshToken);
        }
        if (type === "address") {
          setAddList(res.data);
        } else if (type === "tenant") {
          setTenantList(res.data);
        }
      } else {
        setAddList([]);
        setTenantList([]);
        props.logOut(401, res.error);
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    refreshAll();
  }, []);

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

  function closeWindow(event) {
    if (
      !event.target.className.includes("specific") &&
      !event.target.parentNode.className.includes("specific") &&
      !event.target.className.includes("edit") &&
      !event.target.parentNode.className.includes("edit")
    ) {
      setSpecWindow({ toggle: false, address: "", tenants: "", category: "" });
      setCreateWindow({ toggle: false });
    }
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
          tenants={specWindow.tenants}
          address={specWindow.address}
          category={specWindow.category}
          closeWindow={closeWindow}
        />
      )}
      {createWindow.toggle && (
        <CreateWindow token={props.token} tenantList={tenantList} addressList={addList} closeWindow={closeWindow} />
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
          <button
            type="button"
            className="appList--logOut--button login--toggleRegisterButton"
            onClick={() => props.logOut(200)}
          >
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
