import React from "react";
import Navbar from "../navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer";

function Layout() {
  const location = useLocation();

  const hideLayout = location.pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default Layout;
