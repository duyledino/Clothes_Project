import HeaderAdmin from "@/components/admin/HeaderAdmin";
import Sidebar from "@/components/admin/Sidebar";
import { Providers } from "@/providers";
import React from "react";
import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

const AdminLayout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <Providers>
        <HeaderAdmin />
        <div className="w-full h-[90vh] flex">
          <Sidebar />
          <div className="p-8 flex-1 overflow-y-scroll">{<Outlet />}</div>
        </div>
      </Providers>
    </div>
  );
};

export default AdminLayout;
