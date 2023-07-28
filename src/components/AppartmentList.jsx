import { useState, useEffect } from "react";
import AppCard from "../components/AppCard";
import SpecificWindow from "../components/SpecificWindow";
import Logo from "../components/Logo";
import tenants from "../Data/tenantsData";
import apparts from "../Data/appartmentsData";

export default function AppartmentList() {
  const [appList, setAppList] = useState(apparts);
  const [tenantList, setTenantList] = useState(tenants);
  const [sortByTenant, setSortByTenant] = useState(false);
  const [specWindow, setSpecWindow] = useState({ toggle: false, address: "", tenants: "", category: "" });

  function openSpecificWindow(address, tenants, category, e) {
    e.stopPropagation();
    setSpecWindow({ toggle: true, address: address, tenants: tenants, category: category });
  }

  function closeSpecificWindow(event) {
    if (!event.target.className.includes("specific") && !event.target.parentNode.className.includes("specific")) {
      setSpecWindow({ toggle: false, address: "", tenants: "", category: "" });
    }
  }

  function sortTenant() {
    setSortByTenant((oldSort) => !oldSort);
  }

  // Creating individual appartment cards
  function createAddressCards() {
    const addressElements = appList.map((app) => {
      const tenants = [];
      app.tenantList.forEach((tenant) => {
        tenants.push(tenantList.find((el) => el.objectId === tenant));
      });
      return <AppCard key={app.objectId} appInfo={app} openSpecific={openSpecificWindow} tenants={tenants} />;
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
      {specWindow.toggle ? (
        <SpecificWindow
          tenants={specWindow.tenants}
          address={specWindow.address}
          category={specWindow.category}
          closeWindow={closeSpecificWindow}
        />
      ) : (
        ""
      )}
      <div className="appList--sortSwitch--container">
        <label className="switch">
          <input onChange={sortTenant} checked={sortByTenant} name="sortByTenant" type="checkbox" />
          <span className="slider round"></span>
        </label>
        <h4 className="appList--sorted--text">{sortByTenant ? "Sort by Street Name" : "Sort by tenants"}</h4>
      </div>
      <section className="appList--section">{sortByTenant ? "" : createAddressCards()}</section>
    </main>
  );
}
