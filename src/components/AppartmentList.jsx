import { useState } from "react";
import AppCard from "../components/AppCard";
import Logo from "../components/Logo";
import tenants from "../Data/tenantsData";
import apparts from "../Data/appartmentsData";

export default function AppartmentList() {
  const [appList, setAppList] = useState(apparts);
  const [tenantList, setTenantList] = useState(tenants);

  function onClick() {
    console.log("Card clicked");
  }

  // Creating individual appartment cards
  const appElements = appList.map((app) => {
    const tenants = [];
    app.tenantList.forEach((tenant) => {
      tenants.push(tenantList.find((el) => el.objectId === tenant));
    });
    return <AppCard key={app.objectId} appInfo={app} handleClick={onClick} tenants={tenants} />;
  });

  return (
    <main className="appList--container">
      <Logo />
      <section className="appList--section">{appElements}</section>
    </main>
  );
}
