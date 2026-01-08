"use client";
import React, { useEffect, useMemo, useState } from "react";
// Import Lucide icons
import {
  Plus,
  Search,
  MoreVertical,
  RotateCcw,
  Ban,
  Mouse,
  Cable,
  Pencil,
  Home,
  type LucideIcon,
  Check,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchBanUserByAdmin, fetchGetAllUser, fetchGetAUser_Admin, fetchUnbanUserByAdmin, fetchUpdateUserAdmin } from "@/slice/UserSlice";
import Loading from "@/components/ui/Loading";
import { fetchGetAllRole } from "@/slice/RoleSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Confirm from "@/components/general/Confirm";

function badgeStatus(status: boolean) {
  if (status) return "bg-green-100 text-green-800";
  return "bg-slate-100 text-slate-600";
}

export default function Users() {
  const { AllUser, User_Admin, loadingUser } = useAppSelector(
    (state) => state.UserSlice
  );
  const router = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { roles, loadingRole } = useAppSelector((state) => state.RoleSlice);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [filterRoleId, setFilterRoleId] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  console.log("roles: ",roles);
  useEffect(() => {
    dispatch(fetchGetAllRole());
    dispatch(fetchGetAllUser({page: 1,role_id:filterRoleId}));
  }, [filterRoleId]);
  useEffect(() => {
    if (AllUser.length > 0) {
      setSelectedId(AllUser[0].user_id);
    }
  }, [AllUser]);
  useEffect(() => {
    if (selectedId !== "") {
      dispatch(fetchGetAUser_Admin(selectedId));
    }
  }, [selectedId]);
  console.log("AllUser: ", AllUser);
  console.log("User_Admin: ", User_Admin);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  useEffect(() => {
    if (selectedId !== "") {
      dispatch(fetchGetAUser_Admin(selectedId));
      setShowDetailMobile(true);
    }
  }, [selectedId]);
  
  if (!User_Admin) return null;
  const handleResetPass = async() => {
    if(User_Admin.user_info.user_id === null 
      || User_Admin.user_info.name === null 
      || User_Admin.user_info.name === "" 
      || User_Admin.user_info.role.role_id === null 
      || User_Admin.user_info.status === null
    || User_Admin.user_info.email === null
    || User_Admin.user_info.email === ""){
      toast.error("Thông tin người dùng không hợp lệ");
      return;
    }
    
    const {type} = await dispatch(fetchUpdateUserAdmin({
      user_id: User_Admin.user_info.user_id,
      name: User_Admin.user_info.name,
      address: User_Admin.user_info.address,
      password: "123456",
      status: User_Admin.user_info.status,
      role_id: User_Admin.user_info.role.role_id,
    }));
    if(type.search("reject") == -1){
      toast.success("Reset password thành công");
      dispatch(fetchGetAllUser({page: 1,role_id:filterRoleId}));
    }
  }

  const handleBanUser=async(user_id:string)=>{
    if(!user_id || user_id === ""){
      toast.error("Không tìm thấy người dùng");
      return;
    } 
    const {type} = await dispatch(fetchBanUserByAdmin(user_id));
    if(type.search("reject") == -1){
      dispatch(fetchGetAllUser({page: 1,role_id:filterRoleId}));
      dispatch(fetchGetAUser_Admin(user_id));
    }
  }

  const handleUnbanUser=async(user_id:string)=>{
    if(!user_id || user_id === ""){
      toast.error("Không tìm thấy người dùng");
      return;
    } 
    const {type} = await dispatch(fetchUnbanUserByAdmin(user_id));
    if(type.search("reject") == -1){
      dispatch(fetchGetAllUser({page: 1,role_id:filterRoleId}));
      dispatch(fetchGetAUser_Admin(user_id));
    }
  }

  return (
    <>
      <Confirm
        isOpen={isConfirmOpen}
        setOpen={setIsConfirmOpen}
        content="Bạn có chắc chắn muốn reset mật khẩu với mật khẩu mặc định là 123456 ?"
        onConfirm={handleResetPass}
      />
      {(loadingUser || loadingRole) && <Loading />}
      <div className="flex h-[calc(100vh-0px)] w-full overflow-hidden bg-[#f6f6f8] text-slate-900">
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col gap-4 flex-shrink-0 z-10">
            <div className="flex justify-between items-start">
              {/* <div>
                <h2 className="text-2xl font-black tracking-tight">
                  User Management
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Manage user profiles, roles, and permissions.
                </p>
              </div> */}
              <button
              onClick={()=>{
                router("AddUser")
              }}
              className="bg-[#135bec] hover:bg-[#135bec]/90 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                <Plus size={20} strokeWidth={2.5} />
                Add New User
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-2">
              {/* Search */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search size={18} />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-slate-100 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#135bec] text-sm"
                  placeholder="Search by name, email, or ID..."
                  type="text"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
                <Chip
                  key={"All"}
                  active={filterRoleId === ""}
                  onClick={() => setFilterRoleId("")}
                >
                  Tất cả
                </Chip>
                {roles &&
                  roles.length > 0 &&
                  roles.map((item) => (
                    <Chip
                      active={filterRoleId === item.role_id}
                      onClick={() => setFilterRoleId(item.role_id)}
                    >
                      {item.role_name.toUpperCase()}
                    </Chip>
                  ))}
              </div>
            </div>
          </header>

          {/* Split view */}
          <div className="flex flex-1 overflow-hidden relative">
            {/* Left panel: table */}
            <div className={`flex-1 overflow-auto bg-slate-50 p-6 pr-2 ${showDetailMobile ? 'hidden md:block' : 'block'}`}>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-24">
                        User ID
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                        Email
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">
                        Role
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-32">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {AllUser.map((u) => {
                      const active = u.user_id === selectedId;
                      return (
                        <tr
                          key={u.user_id}
                          onClick={() => setSelectedId(u.user_id)}
                          className={[
                            "cursor-pointer transition-colors border-l-4",
                            active
                              ? "bg-[#135bec]/5 border-l-[#135bec]"
                              : "hover:bg-slate-50 border-l-transparent",
                          ].join(" ")}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            #{u.user_id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {/* <div
                              className="size-8 rounded-full bg-cover bg-center"
                              style={{ backgroundImage: `url('${u.}')` }}
                            /> */}
                              <div className="font-medium text-slate-900">
                                {u.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">
                            {u.email}
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium `}
                            >
                              {u.role.role_name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStatus(
                                u.status
                              )}`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${
                                  u.status ? "bg-green-500" : "bg-slate-400"
                                }`}
                              />
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right panel: detail */}
            <div className={`
                ${showDetailMobile ? 'fixed inset-0 z-50 w-full' : 'hidden'}
                md:relative md:block md:w-[450px] md:z-0
                flex-shrink-0 bg-white border-l border-slate-200 overflow-y-auto flex flex-col shadow-xl
            `}>
              {/* detail header */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 p-6 z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {/* Back Button for Mobile */}
                    <button 
                         className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800"
                         onClick={() => setShowDetailMobile(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {/* <div
                    className="size-16 rounded-full bg-cover bg-center ring-2 ring-[#135bec] ring-offset-2 ring-offset-white"
                    style={{ backgroundImage: `url('${selected.avatar}')` }}
                  /> */}
                    <div>
                      <h3 className="text-xl font-bold">{User_Admin?.user_info.name}</h3>
                      <p className="text-sm text-slate-500">
                        User ID: #{User_Admin?.user_info.user_id}
                      </p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button 
                  onClick={()=>{
                  //  handleResetPass() 
                   setIsConfirmOpen(true)
                  }}
                  className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                    <RotateCcw size={16} />
                    Reset Pass
                  </button>
                  {User_Admin ?
                  User_Admin.user_info.status ?
                  <button
                  onClick={()=>{
                    handleBanUser(User_Admin.user_info.user_id);
                  }}
                  className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                    <Ban size={16} />
                    Ban User
                  </button>
                  : <button
                  onClick={()=>{
                    handleUnbanUser(User_Admin.user_info.user_id);
                  }}
                  className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                    <Check size={16} />
                    Unban User
                  </button>
                  : ""}
                </div>
              </div>

              {/* detail content */}
              <div className="p-6 space-y-8">
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Profile Details
                    </h4>
                    <button className="text-[#135bec] text-sm font-bold hover:underline">
                      Edit
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Email Address
                      </label>
                      <p className="text-sm font-medium text-slate-900">
                        {User_Admin.user_info.email}
                      </p>
                    </div>                                                              

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Phone Number
                      </label>
                      <p className="text-sm font-medium text-slate-900">
                        {User_Admin.user_info.phone}
                      </p>
                  </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Role
                      </label>
                      <select
                        className="block w-full rounded-lg border-slate-300 bg-white text-slate-900 py-2 pl-3 pr-8 text-sm focus:border-[#135bec] focus:ring-[#135bec] shadow-sm"
                        defaultValue={User_Admin.user_info.role.role_id}
                      >
                        {roles.map((role) => (
                          <option key={role.role_id} value={role.role_id}>
                            {role.role_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <div className="h-px w-full bg-slate-200" />

                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Recent Orders
                    </h4>
                    <button className="text-[#135bec] text-sm font-bold hover:underline">
                      View All
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    {User_Admin?.orders.map((item) => (
                      <OrderCard
                        order_id={item.order_id}
                        create_at={item.create_at}
                        update_at={item.update_at}
                        method={item.method}
                        payment={item.payment}
                        total={item.total}
                        status={item.status}
                      />
                    ))}
                    {/* <OrderCard id="9918" date="Oct 12, 2023" amount="$45.50" status="Shipped" /> */}
                  </div>
                </section>

                <div className="h-px w-full bg-slate-200" />

                <section>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                    Active Cart
                  </h4>

                  <div className="space-y-3">
                    {User_Admin &&
                      User_Admin.carts.map((item) => (
                        <CartItem
                          imageUrl={item.product.imageUrl[0]}
                          title={item.product.product_name}
                          meta={`SL: ${item.quantity} * ${item.product.price}`}
                          total={`${item.subtotal} VND`}
                        />
                      ))}
                    {/* <CartItem
                    icon={Cable}
                    title="HDMI Cable 6ft"
                    meta="Qty: 1 • $12.50 ea"
                    total="$12.50"
                  /> */}
                  </div>
                </section>

                <div className="h-px w-full bg-slate-200" />

                <section>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                    Saved Address
                  </h4>

                  <div className="p-4 rounded-lg border border-slate-200 bg-white relative group">
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-[#135bec]">
                        <Pencil size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Home size={16} className="text-slate-400" />
                      <span className="text-xs font-bold text-[#135bec] uppercase tracking-wide">
                        Default Shipping
                      </span>
                    </div>
                    <p className="text-sm text-slate-900 font-medium">
                      {User_Admin?.user_info?.address}
                    </p>
                  </div>
                </section>

                <div className="pt-4">
                  <button className="w-full bg-[#135bec] hover:bg-[#135bec]/90 text-white py-3 rounded-lg font-bold text-sm shadow-md transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
        active
          ? "bg-[#135bec] text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function OrderCard({
  order_id,
  create_at,
  update_at,
  total,
  status,
  method,
  payment,
}: {
  order_id: string;
  create_at: Date;
  update_at: Date;
  status: string;
  payment: string;
  method: string;
  total: number;
}) {
  const badge =
    status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-blue-100 text-blue-800";

  return (
    <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-900">
          Order #{order_id}
        </span>
        <span className="text-xs text-slate-500">
          {create_at.toLocaleString("vi-VN")}
        </span>
        <span className="text-xs text-slate-500">{method}</span>
        <span className="text-xs text-slate-500">{payment}</span>
        <span className="text-xs text-slate-500">
          {update_at.toLocaleString("vi-VN")}
        </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-bold text-slate-900">
          {total.toLocaleString("vi-VN")}
        </span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${badge}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function CartItem({
  imageUrl,
  title,
  meta,
  total,
}: {
  imageUrl: string;
  title: string;
  meta: string;
  total: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="size-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
        <img
          src={`${imageUrl}`}
          className="w-3.5 h-3.5 object-cover rounded-[10px]"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900 leading-tight">
          {title}
        </p>
        <p className="text-xs text-slate-500 mt-1">{meta}</p>
      </div>
      <p className="text-sm font-bold text-slate-900">{total}</p>
    </div>
  );
}
