import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import AddPage from "./pages/Admin/AddProduct";
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
import Users from "./pages/Admin/User";
import OrderDetail from "./pages/Admin/OrderDetail";
import Inventory from "./pages/Admin/Inventory";
import AddStockReceipt from "./pages/Admin/AddStockReceipt";
import AddProduct from "./pages/Admin/AddProduct";
import AddUser from "./pages/Admin/AddUser";
import AddColor from "./pages/Admin/AddColor";
import AddSize from "./pages/Admin/AddSize";
import { Colors } from "chart.js";
import Color from "./pages/Admin/Color";
import Size from "./pages/Admin/Size";
import Role from "./pages/Admin/Role";
import AddRole from "./pages/Admin/AddRole";
import EmployeeLayout from "./pages/Employee/EmployeeLayout";
import DoneOrders from "./pages/Employee/DoneOrders";
import ShippingOrders from "./pages/Employee/ShippingOrders";
import ShippingOrderDetail from "./pages/Employee/ShippingOrderDetail";
import PrepareOrders from "./pages/Employee/PrepareOrders";
import AddCategory from "./pages/Admin/AddCategory";
import Categories from "./pages/Admin/Categories";
import Providers from "./pages/Admin/Providers";
import AddProvider from "./pages/Admin/AddProviders";
import StockReceipts from "./pages/Admin/StockReceipts";
import StockReceiptDetail from "./pages/Admin/StockReceiptDetail";
import NotFound from "./pages/Public/NotFound";
import ProtectRouteEmployee from "./auth/ProtectRouteEmployee";

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
            <Route
              path="Inventory/AddStockReceipt"
              element={<AddStockReceipt />}
            />
            <Route path="Products/AddProduct" element={<AddProduct />} />
            <Route path="User/AddUser" element={<AddUser />} />
            <Route path="Color/AddColor" element={<AddColor />} />
            <Route path="Size/AddSize" element={<AddSize />} />
            <Route path="Role/AddRole" element={<AddRole />} />
            <Route path="Provider/AddProvider" element={<AddProvider />} />
            <Route path="Category/AddCategory" element={<AddCategory />} />
            <Route path="Color" element={<Color />} />
            <Route path="Category" element={<Categories />} />
            <Route path="Size" element={<Size />} />
            <Route path="Role" element={<Role />} />
            <Route path="Inventory" element={<Inventory />} />
            <Route path="Chat" element={<ChatAdminPage />} />
            <Route path="Orders" element={<OrderPage />} />
            <Route path="Orders/:order_id" element={<OrderDetail />} />
            <Route path="Products" element={<Products />} />
            <Route path="User" element={<Users />} />
            <Route path="Provider" element={<Providers />} />
            <Route path="Receipt" element={<StockReceipts />} />
            <Route path="Receipt/:receipt_id" element={<StockReceiptDetail />} />
          </Route>
        </Route>
        <Route element={<ProtectRouteEmployee />}>
        <Route path="/Employee" element={<EmployeeLayout />}>
          <Route index element={<Navigate to="DoneOrders" replace />} />
          <Route path="DoneOrders" element={<DoneOrders />} />
          <Route path="ShippingOrders" element={<ShippingOrders />} />
          <Route
            path="ShippingOrders/:order_id"
            element={<ShippingOrderDetail />}
          />
          <Route path="PrepareOrders" element={<PrepareOrders />} />
          {/* <Route path="Products" element={<Products />} /> */}
          {/* <Route path="User" element={<Users />} /> */}
        </Route>
        </Route>
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/NotFound" replace />} />
      </Routes>
    </>
  );
}

export default App;
