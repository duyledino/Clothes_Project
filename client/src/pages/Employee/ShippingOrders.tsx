import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetShippingOrdersByShipperId } from "@/slice/OrderSlice";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/general/Pagination";

export default function ShippingOrders() {
  const { ShipperShippingOrders,loadingOrder,totalPagesShippingOrders } = useAppSelector((state) => state.OrderSlice);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const {user} = useAppSelector((state) => state.AuthSlice);
  useEffect(()=>{
    dispatch(fetchGetShippingOrdersByShipperId({
      shipper_id: user!.user.user_id!,
      page: page
    }));
  },[page])
  return (
    <>
    {loadingOrder && <Loading/>}
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Shipping Orders</h1>
        <p className="text-slate-500">Orders currently being delivered by you.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ShipperShippingOrders.map((order) => (
          <Link to={`/Employee/ShippingOrders/${order.order_id}`} key={order.order_id}>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 text-[#135bec] rounded-lg group-hover:bg-[#135bec] group-hover:text-white transition-colors">
                    <Truck size={24} />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Order #{order.order_id}</h3>
              <p className="text-sm text-slate-500 mb-4">{order.user_create.name}</p>
              
              <div className="text-sm text-slate-600">
                <p className="mb-1"><span className="font-semibold">Address:</span> {order.user_create.address}</p>
                <p><span className="font-semibold">Date:</span> {order.create_at.toLocaleString("vi-VN",{timeZone: "Asia/Ho_Chi_Minh"})
                .replace("T"," ").replace("Z","")}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} total_page={totalPagesShippingOrders}/>
    </div>
    </>
  );
}
