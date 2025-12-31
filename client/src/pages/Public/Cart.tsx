import React, { useEffect, useState } from "react";
import CartTotal from "@/components/guest/CartTotal";
import ClientCart from "@/components/guest/ClientCart";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchCreateOrder, resetState } from "@/slice/OrderSlice";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";
import { fetchApiCart } from "@/slice/CartSlice";
import { fetchApiPaymentURL } from "@/slice/PaymentSlice";
import { useNavigate } from "react-router-dom";

// NOTE:  const {user,loading} = useAppSelector(state=>state.AuthSlice);  is checked in ProtectRouteUser so here I will force it to accept the variable

const CartPage = () => {
  const router = useNavigate();
  const [method, setMethod] = useState<string | null>(null);
  const { user, loading } = useAppSelector((state) => state.AuthSlice);
  const [process, setProcess] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { carts } = useAppSelector((state) => state.CartSlice);
  const { MessageOrder, errorOrder, loadingOrder, order_id } = useAppSelector(
    (state) => state.OrderSlice
  );
  const { PaymentURL, paymentError, paymentLoading } = useAppSelector(
    (state) => state.PaymentSlice
  );
  //NOTE: handle "Proceed to checkout" button
  const handleCLick = async () => {
    if (!user || user.user.user_id === null) {
      toast.error("Cần đăng nhập để thực hiện thao tác này");
      router("/login");
    }
    if (method == null) {
      toast.error("Hãy chọn phương thức thanh toán");
      return;
    }
    // const { token, id } = JSON.parse(localStore);
    const { type } = await dispatch(
      fetchCreateOrder({
        user_id: user?.user.user_id!,
        detail: carts
          .filter((item) => item.active === true)
          .map((item) => ({
            product_name: item.product.product_name,
            quantity: item.quantity,
            product_id: item.product.product_id,
            subtotal: item.subtotal,
            product_size: item.product_size,
            product_color: item.product_color,
          })),
        method: method,
      })
    );
    if (type.search("reject") == -1) {
      console.log("order_id: ", order_id);
      dispatch(fetchApiCart(user?.user.user_id!));
      dispatch(resetState());
    }
  };
  console.log("method: ", method);
  //NOTE:check Message or error after fetch api
  useEffect(() => {
    // if (MessageOrder && !errorOrder) {
    //   toast.success(MessageOrder);
    //   // if (localStore === undefined || localStore === null) {
    //   //   toast.error("No token");
    //   //   return;
    //   // }
    //   // const { token, id } = JSON.parse(localStore);
    //   dispatch(fetchApiCart(user?.user.user_id!));
    //   dispatch(resetState());
    // }
    // issssssssssssssssssss
    console.log(
      "PaymentURL, paymentError, MessageOrder, errorOrder",
      PaymentURL,
      paymentError,
      MessageOrder,
      errorOrder
    );
    if (PaymentURL) {
      window.location.href = PaymentURL;
      setProcess(true);
    }
  }, [PaymentURL, paymentError, MessageOrder, errorOrder]);
  //NOTE:check local storage is change ?
  useEffect(() => {
    const storageChange = () => {
      const result = localStorage.getItem("payment_result");
      if (result !== null || result !== undefined) {
        setProcess(false);
        toast.info(JSON.parse(result as string));
        localStorage.removeItem("payment_result");
      }
    };
    window.addEventListener("storage", storageChange);
    return () => window.removeEventListener("storage", storageChange);
  }, []);
  //NOTE: handle orderId after fetch api create an order
  useEffect(() => {
    if (order_id !== null) {
      // if (localStore === undefined || localStore === null) {
      //   toast.error("No token");
      //   return;
      // }
      if (method !== null && method == "OP") {
        const total = carts
          .filter((item) => item.active === true)
          .reduce((prev, curr) => prev + curr.subtotal, 0);
        // const { token } = JSON.parse(localStore);
        // const OrderId = order_id as string;
        dispatch(fetchApiPaymentURL({ order_id: order_id, total: total }));
      }
    }
  }, [order_id]);
  console.log(
    "loadingOrder || paymentLoading || process || loading",
    loadingOrder,
    paymentLoading,
    process,
    loading
  );
  return (
    <>
      {(loadingOrder || paymentLoading || process || loading) && <Loading />}
      <div className="container mx-auto pt-14">
        <div className="w-full px-3.5 flex flex-col">
          <div className="lg:w-full">
            <ClientCart carts={carts} />
          </div>
          <div className="lg:w-2/5 w-full md:self-end">
            <CartTotal
              carts={carts}
              setMethod={setMethod}
              handleClick={handleCLick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
