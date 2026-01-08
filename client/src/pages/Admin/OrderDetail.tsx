"use client";
import React, { useEffect, useState } from "react";
// Import Lucide icons
import {
  Printer,
  Receipt,
  Pencil,
  Mail,
  Phone,
  CreditCard,
  type LucideIcon,
  Truck,
  CheckCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Loading from "@/components/ui/Loading";
import {
  fetchOrderByOrderId,
  fetchUpdateOrderAdmin,
} from "@/slice/OrderSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUserIsShipperByName } from "@/slice/UserSlice";
import { toast } from "react-toastify";

interface orderHistory {
  title: string;
  detail: string;
  dot: string;
}

export default function OrderDetail() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [orderHistory, setOrderHistory] = useState<orderHistory[]>([]);
  const { AllUserShipper, loadingUser } = useAppSelector(
    (state) => state.UserSlice
  );
  const { OrderUserAdmin, loadingOrder } = useAppSelector(
    (state) => state.OrderSlice
  );
  useEffect(() => {
    console.log(
      "pathname: ",
      pathname.split("/")[pathname.split("/").length - 1]
    );
    dispatch(
      fetchOrderByOrderId(pathname.split("/")[pathname.split("/").length - 1])
    );
  }, [pathname]);
  useEffect(() => {
    if (OrderUserAdmin != null) {
      setOrderHistory(() => {
        if (OrderUserAdmin.status == "canceled") {
          return [
            {
              title: "Đã Hủy",
              detail:
                "Đã Hủy vào lúc: " +
                OrderUserAdmin.update_at
                  .toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })
                  .replace("T", " ")
                  .replace("Z", ""),
              dot: "canceled",
            },
          ];
        }
        const created = OrderUserAdmin.create_at;
        const updated =
          OrderUserAdmin.payment == "pending"
            ? "Chưa thanh toán"
            : OrderUserAdmin.update_at;
        const shipped =
          OrderUserAdmin.delivered_date == null
            ? "Chưa giao"
            : OrderUserAdmin.delivered_date;
        return [
          {
            title: "Đã giao",
            detail:
              shipped !== "Chưa giao"
                ? shipped
                    .toLocaleString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })
                    .replace("T", " ")
                    .replace("Z", "")
                : "Chưa giao",
            dot: "done",
          },
          {
            title: "Thanh toán",
            detail:
              updated !== "Chưa thanh toán"
                ? updated
                    .toLocaleString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })
                    .replace("T", " ")
                    .replace("Z", "")
                : "Chưa thanh toán",
            dot: "primary",
          },
          {
            title: "Đã tạo",
            detail: created
              .toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
              })
              .replace("T", " ")
              .replace("Z", ""),
            dot: "muted",
          },
        ];
      });
      if (OrderUserAdmin.status !== "done") {
        dispatch(fetchUserIsShipperByName());
      }
    }
  }, [OrderUserAdmin]);

  const handleSelectShipperChange = async (e: string | null) => {
    if (e == null || e == "") {
      toast.error("Shipper chưa chọn");
      return;
    }
    const { type } = await dispatch(
      fetchUpdateOrderAdmin({
        order_id: OrderUserAdmin?.order_id!,
        payment: OrderUserAdmin?.payment!,
        status: "shipping",
        shipper_id: e,
      })
    );
    if (type.search("reject") == -1) {
      toast.success("Cập nhật đơn hàng này thành công");
      dispatch(fetchOrderByOrderId(OrderUserAdmin?.order_id!));
    }
    // console.log("e: ", e);
  };
  console.log("OrderUserAdmin: ", OrderUserAdmin);
  console.log("Shipper in : ", AllUserShipper);
  return (
    <>
      {(loadingOrder || loadingUser) && <Loading />}
      {OrderUserAdmin && (
        <div className="min-h-screen bg-[#f6f6f8] text-[#111318]">
          {/* Content */}
          <main className="p-4 md:p-8 lg:px-12 xl:px-20">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Title + actions */}
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-black tracking-tight">
                      Order #{OrderUserAdmin.order_id}
                    </h1>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                        OrderUserAdmin.status == "done"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : OrderUserAdmin.status == "pending"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      <CheckCircle size={14} />
                      {OrderUserAdmin.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[#616f89]">
                    Đặt hàng vào ngày{" "}
                    <span className="font-medium text-[#111318]">
                      {OrderUserAdmin.create_at
                        .toLocaleString("vi-VN", {
                          timeZone: "Asia/Ho_Chi_Minh",
                        })
                        .replace("T", " ")
                        .replace("Z", "")}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <BtnGhost icon={Printer} text="Print Order" />
                  <BtnGhost icon={Receipt} text="Generate Invoice" />
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-[#135bec] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-colors">
                    <Pencil size={18} />
                    Update Status
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Order Items Table */}
                  <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
                    <div className="border-b border-[#e5e7eb] px-6 py-4 flex justify-between items-center">
                      <h3 className="text-lg font-bold">Order Items</h3>
                      <span className="text-sm text-[#616f89] font-medium">
                        {OrderUserAdmin.order_detail.length} món
                      </span>
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-[#f6f6f8] text-[#616f89] border-b border-[#e5e7eb]">
                          <tr>
                            <th className="px-6 py-3 font-medium">
                              Product ID
                            </th>
                            <th className="px-6 py-3 font-medium w-1/3">
                              Product
                            </th>
                            <th className="px-6 py-3 font-medium">Size</th>
                            <th className="px-6 py-3 font-medium">Color</th>
                            <th className="px-6 py-3 font-medium text-right">
                              Price
                            </th>
                            <th className="px-6 py-3 font-medium text-center">
                              Qty
                            </th>
                            <th className="px-6 py-3 font-medium text-right">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e5e7eb]">
                          {OrderUserAdmin.order_detail.map((it) => (
                            <tr
                              key={`${it.product_id}.${it.product_size?.size_id}.${it.product_color?.color_id}`}
                              className="hover:bg-[#f6f6f8]/50 transition-colors"
                            >
                              <td className="px-6 py-4 font-mono text-xs text-[#616f89]">
                                {it.product_id}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                  <div
                                    className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-[#e5e7eb] bg-cover bg-center"
                                    style={{
                                      backgroundImage: `url('${it.imageUrl}')`,
                                    }}
                                  />
                                  <p className="font-bold">{it.product_name}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-[#616f89]">
                                {it.product_size?.size_id}
                              </td>
                              <td
                                className="p-4"
                                style={{
                                  backgroundColor: `${
                                    it.product_color!.color_id
                                  }`,
                                }}
                              ></td>
                              <td className="px-6 py-4 text-right font-medium">
                                {(it.subtotal / it.quantity).toLocaleString(
                                  "vi-VN"
                                )}{" "}
                                VND
                              </td>
                              <td className="px-6 py-4 text-center text-[#616f89]">
                                {it.quantity}
                              </td>
                              <td className="px-6 py-4 text-right font-bold">
                                {it.subtotal.toLocaleString("vi-VN")} VND
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden grid gap-4 p-4">
                      {OrderUserAdmin.order_detail.map((it) => (
                        <div
                          key={`${it.product_id}.${it.product_size?.size_id}.${it.product_color?.color_id}`}
                          className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100"
                        >
                          <div
                            className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-[#e5e7eb] bg-cover bg-center"
                            style={{
                              backgroundImage: `url('${it.imageUrl}')`,
                            }}
                          />
                          <div className="flex-1">
                             <div className="flex justify-between items-start">
                                 <h4 className="font-bold text-sm text-[#111318] line-clamp-2 mb-1">{it.product_name}</h4>
                             </div>
                             <div className="text-xs text-[#616f89] mb-2 flex flex-wrap gap-2">
                                <span className="bg-white px-1.5 py-0.5 border rounded">Size: {it.product_size?.size_id}</span>
                                <span className="flex items-center gap-1 bg-white px-1.5 py-0.5 border rounded">
                                   Color: <span className="w-3 h-3 rounded-full border" style={{backgroundColor: it.product_color?.color_id}}></span>
                                </span>
                             </div>
                             
                             <div className="flex justify-between items-end mt-2">
                                <div className="text-xs text-[#616f89]">
                                   {it.quantity} x {(it.subtotal / it.quantity).toLocaleString("vi-VN")}
                                </div>
                                <div className="font-bold text-[#111318]">
                                   {it.subtotal.toLocaleString("vi-VN")} VND
                                </div>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col items-end border-t border-[#e5e7eb] bg-[#f6f6f8]/30 px-6 py-6">
                      <div className="w-full max-w-xs space-y-3">
                        <Row
                          label="Subtotal"
                          value={`${OrderUserAdmin?.total.toLocaleString(
                            "vi-VN"
                          )} VND`}
                        />
                        <Row label="Shipping" value={`10,000 VND`} />
                        <div className="border-t border-[#e5e7eb] pt-3 flex justify-between items-center">
                          <span className="text-base font-bold">
                            Total Amount
                          </span>
                          <span className="text-xl font-black text-[#135bec]">
                            {(OrderUserAdmin!.total + 10000).toLocaleString(
                              "vi-VN"
                            )}{" "}
                            VND
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order History Timeline */}
                  <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm p-6">
                    <h3 className="mb-4 text-lg font-bold">Order History</h3>
                    <div className="relative pl-4 border-l border-[#e5e7eb] space-y-6">
                      {orderHistory.map((h, idx) => (
                        <div key={idx} className="relative">
                          <div
                            className={[
                              "absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white",
                              h.dot === "done"
                                ? "bg-green-500"
                                : h.dot === "primary"
                                ? "bg-[#135bec]"
                                : h.dot === "canceled"
                                ? "bg-red-500"
                                : "bg-gray-300",
                            ].join(" ")}
                          />
                          <p className="text-sm font-bold">{h.title}</p>
                          <p className="text-xs text-[#616f89] mt-0.5">
                            {h.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Customer */}
                  <Card title="Customer Details">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-12 w-12 rounded-full bg-cover bg-center bg-gray-200"
                          style={{
                            backgroundImage: `url('${""}')`,
                          }}
                        />
                        <div>
                          <p className="font-bold">
                            {OrderUserAdmin.user_create.name}
                          </p>
                          <p className="text-sm text-[#616f89]">{""}</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-start gap-3">
                          <Mail size={18} className="text-[#616f89]" />
                          <a
                            className="text-sm font-medium text-[#135bec] hover:underline"
                            href={`mailto:${OrderUserAdmin.user_create.email}`}
                          >
                            {OrderUserAdmin.user_create.email}
                          </a>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone size={18} className="text-[#616f89]" />
                          {/* Missing phone property */}
                          <p className="text-sm">{OrderUserAdmin.user_create.phone}</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Delivery */}
                  <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-[#e5e7eb] px-6 py-4 flex justify-between items-center">
                      <h3 className="text-lg font-bold">Delivery Info</h3>
                      <button className="text-xs font-bold text-[#135bec] hover:text-blue-700">
                        Edit
                      </button>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#616f89] mb-2">
                          Shipping Address
                        </p>
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {OrderUserAdmin.user_create.address}
                        </p>
                      </div>
                      <div className="border-t border-[#e5e7eb] pt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#616f89] mb-2">
                          Shipper
                        </p>
                        {OrderUserAdmin.user_ship ? (
                          <>
                            <p className="text-sm leading-relaxed">
                              {OrderUserAdmin.user_ship?.name}
                            </p>
                            <p className="text-sm leading-relaxed">
                              A shipper sẽ giao đến{" "}
                              {OrderUserAdmin.user_create.address}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-red-400 leading-relaxed">
                              Đơn này chưa có người giao
                            </p>
                            <Select onValueChange={handleSelectShipperChange}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Chọn a shipper" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {AllUserShipper &&
                                    AllUserShipper.length > 0 &&
                                    AllUserShipper.map((item) => (
                                      <SelectItem value={`${item.user_id}`}>
                                        {item.name}
                                      </SelectItem>
                                    ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <Card title="Payment Info">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        {OrderUserAdmin.method === "COD" ? (
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100 border border-[#e5e7eb]">
                              <Truck size={18} className="text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-bold">
                                {OrderUserAdmin.method}
                              </p>
                              {/* <p className="text-xs text-[#616f89]">
                              **** {order.payment.last4}
                            </p> */}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100 border border-[#e5e7eb]">
                              <CreditCard size={18} className="text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-bold">VNPAY</p>
                              {/* <p className="text-xs text-[#616f89]">
                                **** {order.payment.last4}
                              </p> */}
                            </div>
                          </div>
                        )}
                        {OrderUserAdmin.payment === "pending" ? (
                          <span className="inline-flex items-center rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                            {OrderUserAdmin.payment}
                          </span>
                        ) : OrderUserAdmin.status === "done" ? (
                          <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            {OrderUserAdmin.payment}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                            {OrderUserAdmin.payment}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <p className="text-xs text-[#616f89]">Payment Date</p>
                          <p className="text-sm font-medium">
                            {OrderUserAdmin.update_at
                              .toLocaleString("vi-VN", {
                                timeZone: "Asia/Ho_Chi_Minh",
                              })
                              .replace("T", " ")
                              .replace("Z", "")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

// Refactored helper components
function BtnGhost({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-[#f6f6f8] transition-colors">
      <Icon size={18} />
      {text}
    </button>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
      <div className="border-b border-[#e5e7eb] px-6 py-4">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#616f89]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
