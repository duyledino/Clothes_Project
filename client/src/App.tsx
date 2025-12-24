import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Public/Home";
import About from "./pages/Public/About";
import CartPage from "./pages/Public/Cart";
import Contact from "./pages/Public/Contact";
import Profile from "./pages/Public/Profile";
import Login from "./pages/Public/Login";
import SignUp from "./pages/Public/Signup";
import Collection from "./pages/Public/Collection";
import ProductDetail from "./pages/Public/Product";
import Payment from "./pages/Public/Payment";
import Admin from "./pages/Admin/Admin";
import AddPage from "./pages/Admin/Add";
import ChatPublicPage from "./pages/Public/Chat";
import ChatAdminPage from "./pages/Admin/Chat";
import OrderPage from "./pages/Admin/Orders";
import Products from "./pages/Admin/Products";
import PublicLayout from "./pages/Public/PublicLayout";
import AdminLayout from "./pages/Admin/AdminLayout";
import ProtectRouteUser from "./auth/ProtectRoute";
import ProtectRouteAdmin from "./auth/ProtectRouteAdmin";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { auth } from "./slice/AuthSlice";
import { getStore, resetStore } from "./slice/StoreSlice";
import { ToastContainer } from "react-toastify";
import Users from "./pages/Admin/User_Management";
import OrderDetail from "./pages/Admin/OrderDetail";
import Inventory from "./pages/Admin/Inventory";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.AuthSlice);
  useEffect(() => {
    const body = document.querySelector("body");
    if (location.pathname.includes("/Admin")) {
      body!.style.overflowY = "hidden";
    } else body!.style.overflowY = "";
  }, [location.pathname]);
  useEffect(() => {
    const userInLocalstorage = localStorage.getItem("user");
    if (userInLocalstorage != null) {
      dispatch(auth(JSON.parse(userInLocalstorage)));
    } else {
      dispatch(resetStore());
      dispatch(auth(null));
    }
  }, [dispatch]);
  console.log(user);
  return (
    <>
      <ToastContainer
        position="bottom-right"
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
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="Chat" element={<ChatPublicPage />} />
          <Route path="About" element={<About />} />
          <Route path="Contact" element={<Contact />} />
          {/* <Route path="Profile" element={<Profile />} /> */}
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<SignUp />} />
          <Route path="Collection" element={<Collection />} />
          <Route path="Collection/:id" element={<ProductDetail />} />
          {/* <Route path="Payment" element={<Payment />} /> */}
        </Route>
        {/* User Route */}
        <Route element={<ProtectRouteUser />}>
          <Route path="/" element={<PublicLayout />}>
            <Route path="Cart" element={<CartPage />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Payment" element={<Payment />} />
          </Route>
        </Route>
        <Route element={<ProtectRouteAdmin />}>
          <Route path="/Admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="Add" element={<AddPage />} />
            <Route path="Inventory" element={<Inventory />} />
            <Route path="Chat" element={<ChatAdminPage />} />
            <Route path="Orders" element={<OrderPage />} />
            <Route path="Orders/:order_id" element={<OrderDetail />} />
            <Route path="Products" element={<Products />} />
            <Route path="User" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
