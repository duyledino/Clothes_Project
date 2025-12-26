import HeaderEmployee from "@/components/employee/HeaderEmployee";
import SidebarEmployee from "@/components/employee/SidebarEmployee";
import React from "react";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div>
        <HeaderEmployee />
        <div className="w-full h-[90vh] flex">
          <SidebarEmployee />
          <div className="p-8 flex-1 overflow-y-scroll">{<Outlet />}</div>
        </div>
    </div>
  );
};

export default EmployeeLayout;
