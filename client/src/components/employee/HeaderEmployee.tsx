import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { assets } from "@/assets/admin_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getStore, popStore, resetStore } from "@/slice/StoreSlice";
import { resetUserState } from "@/slice/UserSlice";

const HeaderEmployee = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { localStore } = useAppSelector((state) => state.StoreSlice);
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getStore("user"));
    }
  }, []);
  
  return (
    <header className="w-full h-24 bg-white/55 shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:p-0 px-2 relative z-50">
      <div className="container m-auto h-full flex items-center justify-between">
        <Link to={"/Employee/PrepareOrders"}>
          <img
            src={assets.logo}
            alt="logo"
            className="w-36 h-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
             <span className="font-semibold text-gray-700">Employee Portal</span>
            {localStore["user"] ? (
            <Button
                onClick={() => {
                // dispatch(resetUserState())
                // dispatch(resetStore());
                // toast.success("Logout successfully");
                router('/');
                }}
                className="bg-gray-900 w-fit rounded-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 border-2 border-gray-900 cursor-pointer"
            >
                Logout
            </Button>
            ) : (
            ""
            )}
        </div>
      </div>
    </header>
  );
};

export default HeaderEmployee;
