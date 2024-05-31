import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen min-w-screen bg-slate-50">
      <div className="bg-white px-10 py-6 drop-shadow max-md:px-5">
        <Header />
      </div>
      <div className="mt-10 p-10 max-md:px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
