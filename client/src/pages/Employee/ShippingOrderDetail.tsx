import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, User, Package, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetShipperOrderDetail, fetchUpdateShipperDelivered, fetchUpdateShipperRejected } from "@/slice/OrderSlice";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";
import Confirm from "@/components/general/Confirm";

export default function ShippingOrderDetail() {
  const { order_id } = useParams();
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const [openConfirmDeliverd, setOpenConfirmDeliverd] = useState(false);
  const [openConfirmDecline, setOpenConfirmDecline] = useState(false);
  const {loadingOrder,ShipperOrderDetail} = useAppSelector((state) => state.OrderSlice);
  useEffect(() => {
    if(order_id){
      dispatch(fetchGetShipperOrderDetail({order_id: order_id}));
    }else{
      router(-1);
      toast.error("Không tìm thấy đơn này");
    }
  },[order_id]);
  const onConfirmDeliverd =async  ()=>{
    const {type} = await dispatch(fetchUpdateShipperDelivered({
      order_id: order_id!,
    }));
    if(type.search("reject") == -1){
      // toast.success("Đã giao hàng");
      router(-1);
      setOpenConfirmDeliverd(false);
    }
  }
  const onConfirmDecline = async ()=>{
    const {type} = await dispatch(fetchUpdateShipperRejected({
      order_id: order_id!,
    }));
    if(type.search("reject") == -1){
      router(-1);
      setOpenConfirmDecline(false);
    }
  }
  console.log("ShipperOrderDetail:",ShipperOrderDetail);
  return (
    <>
    {loadingOrder && <Loading/>}
    <Confirm
    content="Bạn có chắc chắn muốn với hành động đã nhận hàng này?"
    setOpen={setOpenConfirmDeliverd}
    isOpen={openConfirmDeliverd}
    onConfirm={onConfirmDeliverd}
    />
    <Confirm
    content="Bạn có chắc chắn muốn với hành động khách hàng không nhận hàng này?"
    setOpen={setOpenConfirmDecline}
    isOpen={openConfirmDecline}
    onConfirm={onConfirmDecline}
    />
    <div className="max-w-4xl mx-auto">
      <Button 
      variant={"ghost"}
        onClick={() => router(-1)} 
        className="flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Shipping Orders
      </Button>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order #{ShipperOrderDetail?.order_id}</h1>
            <p className="text-slate-500 text-sm mt-1">Shipping Details</p>
          </div>
          <div className="flex gap-2">
            <Button
            onClick={() => setOpenConfirmDecline(true)}
             variant={"destructive"} className="bg-red-600 hover:bg-red-700 text-white">
                  <XCircle className="mr-2 h-4 w-4" />
                  Khách Hàng Không Nhận
              </Button>

              <Button 
              onClick={() => setOpenConfirmDeliverd(true)}
              className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Đã giao
              </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid gap-8 md:grid-cols-2">
            {/* Customer Info */}
            <div className="space-y-6">
                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                        <User size={16} /> Customer Info
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="font-bold text-slate-900 text-lg">{ShipperOrderDetail?.user_create.name}</p>
                        <p className="text-slate-600">SĐT: {ShipperOrderDetail?.user_create.phone ?? "Chưa cập nhật"}</p>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                        <MapPin size={16} /> Delivery Address
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="text-slate-900 leading-relaxed">{ShipperOrderDetail?.user_create.address}</p>
                    </div>
                </section>

                 <section>
                    <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                        <Calendar size={16} /> Order Date
                    </h3>
                    <p className="text-slate-900 font-medium">{ShipperOrderDetail?.create_at.toLocaleString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh"}).replace("T"," ").replace("Z","")}</p>
                </section>
            </div>

            {/* Order Items */}
            <div>
                 <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                        <Package size={16} /> Order Items
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs">
                            <tr>
                                <th className="px-4 py-2 font-semibold">Item</th>
                                <th className="px-4 py-2 font-semibold text-center">Qty</th>
                                <th className="px-4 py-2 font-semibold text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {ShipperOrderDetail?.order_detail.map((item, idx) => (
                                <tr key={item.color.color_id+item.size.size_id}>
                                    <td className="px-4 py-3 text-sm text-slate-900">{item.product.product_name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-900 text-center">{item.quantity}</td>
                                    <td className="px-4 py-3 text-sm text-slate-900 text-right">{item.price.toLocaleString("vi-VN")} VND</td>
                                </tr>
                            ))}
                            <tr key={"tienship"} className="w-full flex justify-between">
                                    <td className="px-4 py-3 text-sm text-slate-900">Tiền ship</td>
                                    <td className="px-4 py-3 text-sm text-slate-900 text-center">{Number(10000).toLocaleString("vi-VN")} VND</td>
                                </tr>
                        </tbody>
                        <tfoot className="bg-slate-50 border-t border-slate-200">
                             <tr>
                                <td colSpan={2} className="px-4 py-3 text-sm font-bold text-slate-900 text-right">Total</td>
                                <td className="px-4 py-3 text-sm font-bold text-slate-900 text-right">{Number(ShipperOrderDetail?.total! + 10000).toLocaleString("vi-VN")} VND</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}
