import React from "react";
import type { SetStateAction } from "react";
import { Button } from "../ui/button";
import type {
  detail,
  OrderUser,
  paymentAndStatus,
} from "@/type/types.frontend";

interface UserOrderProps {
  OrderUser: OrderUser;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setParam: React.Dispatch<SetStateAction<paymentAndStatus>>;
  handlePay: (order_id: string, total: number) => void;
}

const UserOrder: React.FC<UserOrderProps> = ({
  OrderUser,
  setOpen,
  setParam,
  handlePay,
}) => {
  console.log("OrderUser in OrderUser: ", OrderUser);
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-700 font-bold text-base">
          Order ID: <span className="font-normal">{OrderUser.order_id}</span>
        </h1>
      </div>
      <p className="text-gray-700 text-base font-bold">
        User name: <span className="font-normal">{OrderUser.user_create.name}</span>
      </p>
      <p className="text-gray-700 text-base font-bold">
        Address: {OrderUser.user_create.address}
      </p>
      <p className="text-gray-700 text-base font-bold">
        Total: {OrderUser.total} VND
      </p>
      <p className="text-gray-700 text-base font-bold">
        Tạo:{" "}
        <span className="font-normal">
          {OrderUser.create_at.toLocaleString().split("T")[0]}
        </span>
      </p>
      <p className="text-gray-700 text-base font-bold">
        Cập nhật:{" "}
        <span className="font-normal">
          {OrderUser.update_at.toLocaleString().split("T")[0]}
        </span>
      </p>
      <p className="text-gray-700 text-base font-bold">
        Status: {OrderUser.status}
      </p>
      <p className="text-gray-700 text-base font-bold">
        Payment: {OrderUser.payment}
      </p>
      <div>
        <p className="text-gray-700 text-base font-bold">Details:</p>
        <ul>
          {OrderUser.order_detail.map((detail, index) => (
            <li
              key={`${OrderUser.order_id}-${OrderUser.order_detail[
                index
              ].product_id.substring(0, 4)}-${
                OrderUser.order_detail[index].product_size?.size_id
              }-${OrderUser.order_detail[
                index
              ].product_color?.color_id.substring(0, 4)}`}
              className="text-gray-700 text-base font-bold list-disc"
            >
              <span className="font-normal">
                Tên SP: {detail.product_name}, SL: {detail.quantity},
                {detail.product_size?.size_id},{" "}
              </span>
              <span
                style={{ backgroundColor: detail.product_color?.color_id }}
                className="h-4 w-4 inline-block"
              ></span>{" "}
              <span className="font-normal">, Subtotal: {detail.subtotal} VND</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-gray-700 text-base font-bold">
        Phương thức:{" "}
        <span className="text-gray-700 font-normal">
          {OrderUser.method !== "OP"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán online"}
        </span>
      </p>
      <div className="mt-3 flex sm:flex-row flex-col gap-3">
        {OrderUser.status === "canceled" ? (
          <Button
            disabled={true}
            variant={"ghost"}
            className="bg-red-300 md:w-fit w-full text-white hover:text-red-600 uppercase font-semibold py-6 px-8 rounded border-2 border-red-600"
          >
            Canceled
          </Button>
        ) : OrderUser.status === "done" ? (
          ""
        ) : (
          <Button
            onClick={() => {
              setParam({
                order_id: OrderUser.order_id,
                payment: OrderUser.payment,
                status: OrderUser.status,
              }),
                setOpen(true);
            }}
            variant={"ghost"}
            className="bg-red-600 md:w-fit w-full text-white hover:bg-transparent hover:text-red-600 uppercase font-semibold py-6 px-8 rounded border-2 border-red-600 cursor-pointer"
          >
            Cancel
          </Button>
        )}
        {((OrderUser.payment === "done" || OrderUser.status === "done") &&
          OrderUser.method === "COD") ||
        OrderUser.status === "canceled" ? (
          ""
        ) : (
          <Button
            // onClick={() => {
            //   setParam({ id, payment, status }), setOpen(true);
            // }}
            onClick={() => handlePay(OrderUser.order_id, OrderUser.total)}
            variant={"ghost"}
            className="bg-gray-900 md:w-fit w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
          >
            Thanh toán
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
