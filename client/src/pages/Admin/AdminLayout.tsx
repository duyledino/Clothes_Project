import HeaderAdmin from "@/components/admin/HeaderAdmin";
import Sidebar from "@/components/admin/Sidebar";
import { Providers } from "@/providers";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
        <HeaderAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="w-full h-[90vh] flex relative ">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="p-8 flex-1 overflow-y-scroll">{<Outlet />}</div>
        </div>
    </div>
  );
};

export default AdminLayout;
