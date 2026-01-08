import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getStore } from "@/slice/StoreSlice";

const navLinks = [
  { name: "home", link: "/" },
  { name: "Collection", link: "/Collection" },
  { name: "About", link: "/About" },
  { name: "Contact", link: "/Contact" },
];

const Nav = () => {
  const dispatch = useAppDispatch();
  const { localStore } = useAppSelector((state) => state.StoreSlice);
  const {user} = useAppSelector(state=>state.AuthSlice);
  const location = useLocation();
  const pathname = location.pathname;
  // const [localStore, setLocalStore] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getStore("user"));
    }
  }, [dispatch]);
  console.log("local Store: ", localStore["user"]);
  return (
    <>
      <nav className="h-full justify-center items-center md:flex hidden">
        <ul className="flex gap-5">
          {navLinks.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.link}
                  className={`uppercase relative hover:before:scale-100 hover:before:opacity-100 before:scale-0 before:absolute before:h-0.5 before:w-full before:left-0 before:bottom-0 before:bg-primary before:transition-all before:content-[''] ${
                    pathname === item.link
                      ? "before:opacity-100 before:scale-100"
                      : "before:opacity-0"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          {user?.user &&
            user.user.user_id !== "" &&
            user.user.role !== "admin" && (
              <li>
                <Link
                  to={`/Chat`}
                  className={`uppercase relative hover:before:scale-100 hover:before:opacity-100 before:scale-0 before:absolute before:h-0.5 before:w-full before:left-0 before:bottom-0 before:bg-primary before:transition-all before:content-[''] ${
                    pathname === "/Chat"
                      ? "before:opacity-100 before:scale-100"
                      : "before:opacity-0"
                  }`}
                >
                  Chat
                </Link>
              </li>
            )}
          {user && user.user && user.user.role === "admin" && (
              <li>
                <Link
                  to="/Admin"
                  className="uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-full hover:bg-foreground hover:text-background transition-all"
                >
                  Admin
                </Link>
              </li>
            )}
            {user && user.user && user.user.role === "shipper" && (
              <li>
                <Link
                  to="/Employee"
                  className="uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-full hover:bg-foreground hover:text-background transition-all"
                >
                  Shipper
                </Link>
              </li>
            )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
