;
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/frontend_assets/assets";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { DoorOpen } from "lucide-react";
import { logout } from "@/slice/AuthSlice";

const navLinks = [
  { name: "home", link: "/" },
  { name: "Collection", link: "/Collection" },
  { name: "About", link: "/About" },
  { name: "Contact", link: "/Contact" },
];

const MobileNav = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const {user} = useAppSelector((state) => state.AuthSlice);
  const handleClickLogout = () => {
    dispatch(logout());
    router("/");
  };
  const [open, setOpen] = useState<boolean | undefined>(false);
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      {user && user.user && user.user.user_id !== "" ? (
        <>
          <div
            className="md:hidden block cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <img src={assets.menu_icon} alt="menu" className="w-6" />
          </div>
          <Sheet open={open} onOpenChange={() => setOpen((prev) => !prev)}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <img src={assets.logo} alt="logo" className="w-36" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col justify-between h-full">
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                {navLinks.map((item) => (
                  <div className="grid gap-3">
                    <Link
                      onClick={() => setOpen((prev) => (prev = false))}
                      key={item.name}
                      to={item.link}
                      className={`uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-[10px] text-center ${
                        path === item.link
                          ? "bg-foreground text-background"
                          : ""
                      } hover:bg-foreground hover:text-background transition-all`}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                {user && user.user &&
                  user.user.user_id !== "" &&
                  user.user.role !== "admin" && (
                    <div className="grid gap-3">
                      <Link
                        onClick={() => setOpen((prev) => (prev = false))}
                        to="/Chat"
                        className={`uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-[10px] text-center ${
                          path === "/Chat"
                            ? "bg-foreground text-background"
                            : ""
                        } hover:bg-foreground hover:text-background transition-all`}
                      >
                        Chat
                      </Link>
                    </div>
                  )}
                {user && user.user &&
                  user.user.user_id !== "" &&
                  user.user.role === "admin" && (
                    <div className="grid gap-3">
                      <Link
                        onClick={() => setOpen((prev) => (prev = false))}
                        to="/Admin"
                        className={`uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-[10px] text-center ${
                          path === "/Admin"
                            ? "bg-foreground text-background"
                            : ""
                        } hover:bg-foreground hover:text-background transition-all`}
                      >
                        Admin
                      </Link>
                    </div>
                  )}
                  {user && user.user &&
                  user.user.user_id !== "" &&
                  user.user.role === "shipper" && (
                    <div className="grid gap-3">
                      <Link
                        onClick={() => setOpen((prev) => (prev = false))}
                        to="/Employee"
                        className={`uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-[10px] text-center ${
                          path === "/Employee"
                            ? "bg-foreground text-background"
                            : ""
                        } hover:bg-foreground hover:text-background transition-all`}
                      >
                        Shipper
                      </Link>
                    </div>
                  )}
              </div>
              {user && user.user &&
                  user.user.user_id !== "" && (
                    <div className="mt-auto mb-5 w-[90%] mx-auto">
                      <div
                        onClick={() => {handleClickLogout()}}
                        className={`uppercase cursor-pointer w-full flex items-center justify-center gap-2 h-full ring-1 ring-black/30 px-5 py-2 rounded-[10px] text-center ${
                          path === "/Logout"
                            ? "bg-foreground text-background"
                            : ""
                        } hover:bg-foreground hover:text-background transition-all`}
                      >
                        Logout <DoorOpen className="w-5 h-auto" />
                      </div>
                    </div>
                  )}
              </div>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MobileNav;
