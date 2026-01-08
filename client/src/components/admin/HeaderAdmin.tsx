import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { assets } from "@/assets/admin_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getStore } from "@/slice/StoreSlice";
import { DoorOpen, Menu } from "lucide-react";

interface HeaderAdminProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const HeaderAdmin = ({ sidebarOpen, setSidebarOpen }: HeaderAdminProps) => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.AuthSlice);
  const { localStore } = useAppSelector((state) => state.StoreSlice);
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getStore("user"));
    }
  }, []);
  console.log("localStore admin:", localStore);
  return (
    <header className="w-full h-24 bg-white/55 shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:p-0 px-2 relative z-[100]">
      <div className="container m-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
           <Menu className="h-15 w-15" />
          </Button>

          <Link to={"/Admin"}>
            <img
              src={assets.logo}
              alt="logo"
              className="w-36 h-auto object-contain"
            />
          </Link>
        </div>

        {user && user.user ? (
          <Button
            onClick={() => {
              toast.success("Đã thoát màn admin");
              router('/');
            }}
            className="bg-gray-900 w-fit rounded-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 border-2 border-gray-900 cursor-pointer"
          >
            <DoorOpen size={20} strokeWidth={2.5} />
          </Button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default HeaderAdmin;
