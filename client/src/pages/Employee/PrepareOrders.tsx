import React, { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetPrepareOrders, fetchUpdateShipperTakeOrder } from "@/slice/OrderSlice";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/general/Pagination";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function PrepareOrders() {
  const { ShipperPrepareOrders,loadingOrder,totalPagesPrepareOrders } = useAppSelector((state) => state.OrderSlice);
  const {user} = useAppSelector(state=>state.AuthSlice);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  useEffect(()=>{
    dispatch(fetchGetPrepareOrders({
      page: page
    }));
  },[page]);
  const handleClick=async(order_id:string)=>{
    if( !user || user.user.user_id == ""){
      toast.error("Lỗi: Không có mã người dùng (user_id)");
      return;
    }
    if(order_id == ""){
      toast.error("Không tìm thấy mã đơn hàng");
      return;
    }
    const {type} = await dispatch(fetchUpdateShipperTakeOrder({
      order_id: order_id,
      shipper_id: user.user.user_id
    }));
    if(type.search("reject")==-1){
      dispatch(fetchGetPrepareOrders({page:page}));
    }
  }
  return (
    <>
    {loadingOrder && <Loading/>}
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Prepare Orders</h1>
        <p className="text-slate-500">Orders that need to be packed and assigned for shipping.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ShipperPrepareOrders.map((order) => (
              <tr key={order.order_id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">#{order.order_id}</td>
                <td className="px-6 py-4">{order.user_create.name}</td>
                <td className="px-6 py-4 text-slate-500">{order.create_at.toLocaleString("vi-VN",{timeZone: "Asia/Ho_Chi_Minh"})
                .replace("T"," ").replace("Z","")}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                  onClick={()=>{handleClick(order.order_id)}}
                  variant={"ghost"} className="text-[#135bec] font-bold text-sm hover:underline">
                    Giao đơn này
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} total_page={totalPagesPrepareOrders}/>
    </div>
    </>
  );
}
