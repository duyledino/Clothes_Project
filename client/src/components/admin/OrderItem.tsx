import React, { useEffect } from "react";
import { Package } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchUpdateOrder, resetState } from "@/slice/OrderSlice";
import { getStore } from "@/slice/StoreSlice";
import { toast } from "react-toastify";
import type { OrderData } from "@/type/types.frontend";
import { logout } from "@/slice/AuthSlice";
//
const OrderItem = ({ order_data }: { order_data: OrderData }) => {
  const dispatch = useAppDispatch();
  // create table for these statuses
  const orderStatuses = ["pending", "canceled", "shipping", "done"];
  const paymentStatuses = ["pending", "done"];
  const { user } = useAppSelector((state) => state.AuthSlice);
  console.log(`order_data: `, order_data);
  const handleChange = (value: string) => {
    if (user && user.user && user.user.role == "admin") {
      dispatch(
        fetchUpdateOrder({
          order_id: order_data.order_id,
          payment: order_data.payment,
          status: value,
        })
      );
    }
  };
  return (
    <div className="w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid lg:grid-cols-[0.5fr_3fr_1fr_2fr] sm:grid-cols-[2fr_3fr] grid-cols-1 gap-3 items-center">
        <div className="flex items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
            <Package className="h-6 w-6 text-gray-600" />
          </div>
        </div>
        <div>
          <h2 className="md:text-sm text-[12px] font-medium text-gray-700 ">
            <div className="flex flex-col">
              {order_data.order_detail !== undefined
                ? order_data.order_detail.map((item) => (
                    <p>
                      {item.product_name} x {item.quantity} x{" "}
                      {item.product_size?.size_id} x{" "}
                      <span
                        style={{
                          backgroundColor: `${item.product_color?.color_id}`,
                        }}
                        className="inline-block w-3 h-3"
                      ></span>
                    </p>
                  ))
                : `Boy Round Neck Pure Cotton T-shirt x 1 L`}
            </div>
          </h2>
          <p className="md:text-sm text-[12px] text-gray-500 font-bold">
            Tên:{" "}
            <span className="font-normal">{order_data.user_create.name}</span>
          </p>
          <p className="md:text-sm text-[12px] text-gray-500 font-bold">
            Email:{" "}
            <span className="font-normal">{order_data.user_create.email}</span>
          </p>
          <p className="md:text-sm text-[12px] text-gray-500 font-bold">
            Giao đến:{" "}
            <span className="font-normal">
              {order_data.user_create.address}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <p className="md:text-sm text-[12px] text-gray-500">
              SL :{" "}
              {order_data.order_detail !== undefined &&
              order_data.order_detail.length > 0
                ? order_data.order_detail.reduce(
                    (prev, curr) => prev + curr.quantity,
                    0
                  )
                : 0}
            </p>
            <p className="md:text-sm text-[12px] text-gray-500 font-bold">
              Method: COD
            </p>
            <p className="md:text-sm text-[12px] text-gray-500 font-bold">
              Payment : {order_data.payment}
            </p>
            <p className="md:text-sm text-[12px] text-gray-500">
              Tạo :{" "}
              {order_data.create_at
                .toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                })
                .replace("T", " ")
                .replace("Z", "")}
            </p>
            <p className="md:text-sm text-[12px] text-gray-500">
              Cập nhật :{" "}
              {order_data.update_at
                .toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                })
                .replace("T", " ")
                .replace("Z", "")}
            </p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:items-center items-start justify-between gap-4">
          <div className="md:text-sm text-[12px] font-medium text-gray-700">
            {order_data.total.toLocaleString("vi-VN")} VND
          </div>
          <div className="">
            {(order_data.payment == "done" && order_data.status == "done" ) || (order_data.status == "canceled")? (
              <Select defaultValue={order_data.status} disabled>
                <SelectTrigger className="md:w-[180px] w-[140px] md:text-sm text-[12px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={`${order_data.status}`}>
                    {order_data.status}
                  </SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Select
                defaultValue={order_data.status}
                onValueChange={handleChange}
              >
                <SelectTrigger className="md:w-[180px] w-[140px] md:text-sm text-[12px]">
                  <SelectValue placeholder={order_data.status} />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
