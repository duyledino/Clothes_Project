import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetDoneOrders } from "@/slice/OrderSlice";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/general/Pagination";

export default function DoneOrders() {
  const { ShipperDoneOrders,loadingOrder,totalPagesDoneOrders } = useAppSelector((state) => state.OrderSlice);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const {user} = useAppSelector((state) => state.AuthSlice);
  useEffect(()=>{
    dispatch(fetchGetDoneOrders({
      shipper_id: user!.user.user_id!,
      page: page
    }));
  },[page])
  console.log("ShipperDoneOrders: ",ShipperDoneOrders);
  return (
    <>
    {loadingOrder && <Loading/>}
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Done Orders</h1>
        <p className="text-slate-500">History of orders you have successfully delivered.</p>
      </div>

      { ShipperDoneOrders && ShipperDoneOrders.length>0 ? 
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Completed At</th>
               <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ShipperDoneOrders.map((order) => (
              <tr key={order.order_id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">#{order.order_id}</td>
                <td className="px-6 py-4">{order.user_create.name}</td>
                <td className="px-6 py-4 text-slate-500">{order.delivered_date ? order.delivered_date.toLocaleString("vi-VN",{timeZone: "Asia/Ho_Chi_Minh"})
                .replace("T"," ").replace("Z","") : "Testing"}</td>
                 <td className="px-6 py-4 font-medium">{order.total.toLocaleString("vi-VN")}</td>
                <td className="px-6 py-4 text-right">
                   <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} />
                    Delivered
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      : <p>Chưa có đơn hoàn thành nào.</p>}
      <Pagination page={page} setPage={setPage} total_page={totalPagesDoneOrders}/>
    </div>
    </>
  );
}
