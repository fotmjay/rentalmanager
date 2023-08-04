import { useState, useEffect } from "react";
import AppCard from "../components/AppCard";
import SpecificWindow from "../components/SpecificWindow";
import CreateWindow from "../components/CreateWindow";
import Logo from "../components/Logo";

export default function AppartmentList(props) {
  const [addList, setAddList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [sortByTenant, setSortByTenant] = useState(false);
  const [specWindow, setSpecWindow] = useState({ toggle: false, address: "", tenants: "", category: "" });
  const [createWindow, setCreateWindow] = useState({ toggle: false });

  async function refreshData(type) {
    try {
      const response = await fetch(`http://localhost:3000/api/${type}`, {
        headers: { "Content-Type": "application/json", authorization: props.token },
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        proxy: "http://localhost:3000",
      });
      if (response.status === 401) {
        setAddList([]);
        setTenantList([]);
        props.notLogged(401);
      }
      const res = await response.json();
      if (res.success === true) {
        if (type === "address") {
          setAddList(res.data);
        } else if (type === "tenant") {
          setTenantList(res.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    refreshData("address");
    refreshData("tenant");
  }, []);

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

  // function createTenantList() {
  //   const tenantElements = tenantList.sort((a,b)=>a.lastName-b.lastName)map(tenant => (
  //     <li key={tenant.id}></li>
  //   ))
  // }

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
      <div className="appList--sortSwitch--container">
        <label className="switch">
          <input onChange={sortTenant} checked={sortByTenant} name="sortByTenant" type="checkbox" />
          <span className="slider round"></span>
        </label>
        <h4 className="appList--sorted--text">{sortByTenant ? "Sort by Street Name" : "Sort by tenants"}</h4>
        <button type="button" className="appList--edit--button" onClick={(e) => openCreateWindow(e)}>
          Add
        </button>
      </div>
      <section className="appList--section">{sortByTenant ? "" : createAddressCards()}</section>
    </main>
  );
}
