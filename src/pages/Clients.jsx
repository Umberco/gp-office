import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ClientsMenu } from "../clients_zone/ClientsMenu";

function Clients() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    // Pokud je cesta "/clients", zobrazí se menu, jinak se skryje
    setShowMenu(location.pathname === "/clients");
  }, [location]);

  return (
    <>
      {showMenu && <ClientsMenu />}
      <Outlet />
    </>
  );
}

export default Clients;
