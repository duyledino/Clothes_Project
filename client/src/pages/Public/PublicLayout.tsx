import Footer from "@/components/guest/Footer";
import Header from "@/components/guest/Header";
import { Providers } from "@/providers";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const PublicLayout = () => {
  const [isInclude, setIsInclude] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/Admin")) setIsInclude(false);
    else setIsInclude(true);
  }, [location.pathname]);
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
      />
      <Providers>
        <Header />
        <Outlet />
        {isInclude ? <Footer /> : ""}
      </Providers>
    </div>
  );
};

export default PublicLayout;
