"use client";
import UpdateInventoryModal from "@/components/admin/UpdateInventoryModal";
import Pagination from "@/components/general/Pagination";
import Loading from "@/components/ui/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetAllInventory, fetchUpdateNewMinQuantityInventory } from "@/slice/InventorySlice";
import type { InventoryInAdmin } from "@/type/types.frontend";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//

function getStatus(quantity: number, min_quantity: number) {
  if (quantity === 0)
    return { text: "Hết hàng", cls: "bg-red-100 text-red-800 w-max" };
  if (quantity <= min_quantity)
    return { text: "SL thấp", cls: "bg-yellow-100 text-yellow-800 w-max" };
  return { text: "Còn hàng", cls: "bg-green-100 text-green-800 w-max" };
}

export default function Inventory() {
  const [page, setPage] = useState<number>(1);
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { loadingInventory, total_page, Inventories } = useAppSelector(
    (state) => state.InventorySlice
  );
  const [selectInventory,setSelectInventory] = useState<InventoryInAdmin | null>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const onUpdate=async (inventory_id: string, new_min_quantity: number)=>{
    if(!inventory_id && !new_min_quantity){
      toast.error("Thiếu thông tin cập nhật tồn kho");
      return;
    }
    const {type} = await dispatch(fetchUpdateNewMinQuantityInventory({
      inventory_id,
      new_min_quantity
    }));
    if(type.search("reject")==-1){
      dispatch(fetchGetAllInventory(page));
      setIsOpenUpdateModal(false);
    }
  } 
  useEffect(() => {
    dispatch(fetchGetAllInventory(page));
  }, [page]);
  useEffect(() => {
    if(selectInventory!=null){
      setIsOpenUpdateModal(true);
    }
  }, [selectInventory]);
  return (
    <>
      <UpdateInventoryModal
                  key={selectInventory?.inventory_id}
                  inventoryItem={selectInventory}
                  isOpen={isOpenUpdateModal}
                  onClose={()=>{setIsOpenUpdateModal(false)}}
                  onUpdate={onUpdate}
                  />
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

        <div className="hidden md:block overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <Th>Hình ảnh</Th>
                <Th>Product</Th>
                <Th>IDs (Inv / Prod)</Th>
                <Th>Status</Th>
                <Th>SL hiện tại</Th>
                <Th>SL tối thiểu</Th>
                <Th>Dates</Th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {Inventories.map((item) => {
                const st = getStatus(item.quantity, item.min_quantity);
                return (
                  <>
                  <tr
                    key={
                      item.inventory_id +
                      item.product_id +
                      item.color_id +
                      item.size_id
                    }
                    className={`hover:bg-gray-50 ${item.quantity<=item.min_quantity?"bg-yellow-100":item.quantity===0?"bg-red-100":""}`}
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
                          style={{ backgroundColor: `${item.color_id}` }}
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
                      <b>{item.quantity}</b> đơn vị
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <b>{item.min_quantity}</b> đơn vị
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
                      <button 
                      onClick={()=>{
                        // setIsOpenUpdateModal(true);
                        setSelectInventory(item);
                      }}
                      className="cursor-pointer text-blue-500 hover:text-blue-600">
                        Edit
                      </button>
                    </td>
                  </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid gap-4">
           {Inventories.map((item) => {
                const st = getStatus(item.quantity, item.min_quantity);
                return (
                  <div key={
                      item.inventory_id +
                      item.product_id +
                      item.color_id +
                      item.size_id
                    }
                    className={`bg-white rounded-lg shadow-sm p-4 border border-gray-200 ${item.quantity<=item.min_quantity?"bg-yellow-50":item.quantity===0?"bg-red-50":""}`}
                  >
                     <div className="flex gap-4 mb-3">
                        <img
                          src={`${item.product.imageUrl}`}
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                        <div>
                             <h3 className="font-medium text-gray-900 line-clamp-2">{item.product.product_name}</h3>
                             <p className="text-xs text-gray-500 mt-1">
                                {item.product.category.category_name} | {item.size_id}
                             </p>
                             <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs text-gray-500">Color:</span>
                                <span
                                  className="inline-block w-3 h-3 border border-gray-300"
                                  style={{ backgroundColor: `${item.color_id}` }}
                                ></span>
                             </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                         <div className="bg-gray-50 p-2 rounded">
                            <span className="block text-xs text-gray-500">Hiện tại</span>
                            <span className="font-bold">{item.quantity}</span>
                         </div>
                         <div className="bg-gray-50 p-2 rounded">
                            <span className="block text-xs text-gray-500">Tối thiểu</span>
                            <span className="font-bold">{item.min_quantity}</span>
                         </div>
                     </div>

                     <div className="flex justify-between items-center pt-2 border-t mt-2">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold ${st.cls}`}
                        >
                          {st.text}
                        </span>
                        <button 
                        onClick={()=>{
                          setSelectInventory(item);
                        }}
                        className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm">
                          Cập nhật
                        </button>
                     </div>
                  </div>
                )
           })}
        </div>
        <Pagination page={page} setPage={setPage} total_page={total_page} />
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
