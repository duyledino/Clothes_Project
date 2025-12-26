"use client";
import Pagination from "@/components/general/Pagination";
import Loading from "@/components/ui/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetAllInventory } from "@/slice/InventorySlice";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 

function getStatus(quantity: number, min_quantity: number) {
  if (quantity === 0)
    return { text: "Out of Stock", cls: "bg-red-100 text-red-800" };
  if (quantity <= min_quantity)
    return { text: "Low Stock", cls: "bg-yellow-100 text-yellow-800" };
  return { text: "In Stock", cls: "bg-green-100 text-green-800" };
}

export default function Inventory() {
  const [page, setPage] = useState<number>(1);
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { loadingInventory, total_page, Inventories } = useAppSelector(
    (state) => state.InventorySlice
  );
  useEffect(() => {
    dispatch(fetchGetAllInventory(page));
  }, []);
  return (
    <>
      {loadingInventory && <Loading />}
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Inventory</h1>
          <button
            onClick={() => {
              router("AddStockReceipt");
            }}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Thêm phiếu nhập
          </button>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <Th>Hình ảnh</Th>
                <Th>Product</Th>
                <Th>IDs (Inv / Prod)</Th>
                <Th>Status</Th>
                <Th>Quantity</Th>
                <Th>Dates</Th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {Inventories.map((item) => {
                const st = getStatus(item.quantity, item.min_quantity);
                return (
                  <tr
                    key={
                      item.inventory_id +
                      item.product_id +
                      item.color_id +
                      item.size_id
                    }
                    className="hover:bg-gray-50"
                  >
                    <td className="p-4 flex justify-center items-center">
                      <img
                        src={`${item.product.imageUrl}`}
                        className="w-11 h-auto font-medium"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">
                        {item.product.product_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.product.category.category_name}, {item.size_id},{" "}
                        <span
                          className="inline-block w-3 h-3"
                          style={{backgroundColor: `${item.color_id}`}}
                        ></span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <div>
                        Inv:{" "}
                        <span className="font-mono">{item.inventory_id}</span>
                      </div>
                      <div className="text-gray-500">
                        Prod:{" "}
                        <span className="font-mono">{item.product_id}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold ${st.cls}`}
                      >
                        {st.text}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <b>{item.quantity}</b> units
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>
                        Created:{" "}
                        {item.create_at
                          .toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                          })
                          .replace("T", " ")
                          .replace("Z", "")}
                      </div>
                      <div className="text-xs">
                        Updated:{" "}
                        {item.update_at
                          .toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                          })
                          .replace("T", " ")
                          .replace("Z", "")}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-500 hover:text-blue-600">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={page} setPage={setPage} total_page={total_page}/>
      </div>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
      {children}
    </th>
  );
}
