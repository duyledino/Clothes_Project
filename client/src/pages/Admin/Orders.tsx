import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import OrderItem from "@/components/admin/OrderItem";
import Pagination from "@/components/guest/Pagination";
import { fetchApiAllOrder } from "@/slice/OrderSlice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { Orders, loadingOrder } = useAppSelector((state) => state.OrderSlice);
  useEffect(() => {
    dispatch(fetchApiAllOrder({ page: page }));
  }, [page]);
  console.log("Orders", Orders);
  return (
    <>
      {loadingOrder && <Loading />}
      <div>
        <h1 className="mb-3 text-gray-900">Đơn hàng</h1>
        <ul className="flex flex-col gap-3">
          {Orders.length > 0
            ? Orders.map((item) => (
                <OrderItem order_data={item} key={item.order_id} />
              ))
            : ""}
        </ul>
        <Pagination
          currentCategories={null}
          page={page}
          pageName="order"
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default OrderPage;
