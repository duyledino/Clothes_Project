import Loading from "@/components/ui/Loading";
import { myAxios } from "@/config/axios";
import { useAppSelector } from "@/hooks/hooks";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectRouteAdmin = () => {
  const [status, setStatus] = useState<"loading" | "allow" | "deny">("loading");
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setStatus("loading");
        const test = await myAxios.get("/test/admin");
        if (test.data.success === 200) {
          console.log("Truy cập admin");
          setStatus("allow");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("user");
        toast.error("Không đủ quyền truy cập");
        setStatus("deny");
      }
    };
    checkAdmin();
  }, []);
  if (status == "loading") {
    return (
      <>
        <Loading />
      </>
    );
  } else if (status == "allow") {
    return <Outlet />;
  }
  return <Navigate to={"/"} replace />;
};

export default ProtectRouteAdmin;
