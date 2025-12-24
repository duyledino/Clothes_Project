import Loading from "@/components/ui/Loading";
import { myAxios } from "@/config/axios";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { reset } from "@/slice/AuthSlice";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectRouteUser = ({}) => {
  const [status, setStatus] = useState<"loading" | "allow" | "deny">("loading");
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setStatus("loading");
        const test = await myAxios.get("/test/user");
        if (test.data.success === 200) {
          console.log("Truy cập admin");
          setStatus("allow");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("user");
        dispatch(reset());
        toast.error("Hãy đăng nhập để thực hiện thao tác này");
        setStatus("deny");
      }
    };
    checkAuth();
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
  return <Navigate to={"/login"} replace />;
};

export default ProtectRouteUser;
