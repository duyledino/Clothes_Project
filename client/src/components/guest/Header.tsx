import React, { useEffect, useState } from "react";
import logo from "@/assets/frontend_assets/logo.png";

import { Link } from "react-router-dom";
import Nav from "./Nav";
import Handle from "./Handle";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchApiCart } from "@/slice/CartSlice";
import Loading from "../ui/Loading";
import { toast } from "react-toastify";

const Header = () => {
  const { error, loading, carts } = useAppSelector((state) => state.CartSlice);
  // const {localStore} = useAppSelector(state=>state.StoreSlice)
  const {user} = useAppSelector(state=>state.AuthSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // console.log("localStore: ",localStore);
    // const user = Object.keys(localStore).length !== 0 ? JSON.parse(localStore.user) : null;
    if (user) {
      console.log("user: ",user);
      dispatch(fetchApiCart(user.user.user_id));
    }
  }, [user]);
  useEffect(() => {
    console.log("carts: ", carts);
  }, [carts]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      {loading && <Loading />}
      <header className="w-full h-24 backdrop-blur-xs sticky z-50 top-0 left-0 bg-white/55 shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:p-0 px-2">
        <div className="container m-auto h-full flex items-center justify-between">
          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              className="w-36 h-auto object-contain"
            />
          </Link>
          <Nav />
          <Handle carts={carts} />
        </div>
      </header>
    </>
  );
};

export default Header;
