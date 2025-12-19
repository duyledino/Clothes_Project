import HeaderAdmin from "@/components/admin/HeaderAdmin";
import Sidebar from "@/components/admin/Sidebar";
import { Providers } from "@/providers";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
        <HeaderAdmin />
        <div className="w-full h-[90vh] flex">
          <Sidebar />
          <div className="p-8 flex-1 overflow-y-scroll">{<Outlet />}</div>
        </div>
    </div>
  );
};

export default AdminLayout;
