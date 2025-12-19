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
      <Header />
      <Outlet />
      {isInclude ? <Footer /> : ""}
    </div>
  );
};

export default PublicLayout;
