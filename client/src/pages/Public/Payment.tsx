import React, { useEffect, useState, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { fetchUpdateOrder } from "@/slice/OrderSlice";
import { toast } from "react-toastify";
import cryptojs from "crypto-js";

function PaymentContent() {
  const { loadingOrder, errorOrder, MessageOrder } = useAppSelector(
    (state) => state.OrderSlice
  );
  const { user } = useAppSelector((state) => state.AuthSlice);
  const [stateTrans, setstateTrans] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [searchParam] = useSearchParams();

  //FIXME: user can get pending order to hack the order's status !!! 😢
  //DONE: using encrypto in server to encrypt the order_id then in client decrypt it
  const order_id_encrypt = searchParam.get("order_id");
  const vnp_TransactionStatus = searchParam.get("vnp_TransactionStatus");
  console.log(order_id_encrypt);
  useEffect(() => {
    if (!order_id_encrypt || !user) return;

    // const localStore = localStorage.getItem("user");
    // if (!localStore) {
    //   toast.error("No token");
    //   return;
    // }
    //decode the query string so I can get the cipher text
    const cipherText = decodeURIComponent(order_id_encrypt);
    console.log("cipherText", cipherText);
    const order_id_decrypt = cryptojs.AES.decrypt(
      cipherText,
      user?.user.user_id!
    ).toString(cryptojs.enc.Utf8);
    console.log(
      "order id,vnp_TransactionStatus : ",
      order_id_decrypt,
      vnp_TransactionStatus,
      order_id_decrypt
    );
    if (vnp_TransactionStatus === "02") {
      setstateTrans("Giao dịch thất bại");
    } else if (vnp_TransactionStatus === "01") {
      setstateTrans("Giao dịch chưa hoàn thành");
    } else {
      console.log("order_id_decrypt: ", order_id_decrypt); // false ??
      dispatch(
        fetchUpdateOrder({
          order_id: order_id_decrypt,
          payment: "done",
          status: "pending",
        })
      );
    }
  }, [order_id_encrypt, vnp_TransactionStatus, user, dispatch]);

  useEffect(() => {
    console.log("errorOrder: ", errorOrder);
    if (MessageOrder && !errorOrder) {
      localStorage.setItem("payment_result", JSON.stringify(MessageOrder));
    }
    if (errorOrder) {
      setstateTrans(errorOrder);
    }
  }, [errorOrder, MessageOrder]);

  useEffect(() => {
    if (stateTrans !== null) {
      localStorage.setItem("payment_result", JSON.stringify(stateTrans));
    }
  }, [stateTrans]);
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {(loadingOrder || !order_id_encrypt) && (
          <div className="animate-pulse">
            <p className="text-xl font-semibold">Processing your payment...</p>
            <div className="mt-4 h-4 bg-gray-300 rounded w-2/3 mx-auto" />
          </div>
        )}

        {stateTrans !== null && (
          <div className="text-red-600">
            <p className="text-xl font-semibold">Payment Failed</p>
            <p className="mt-2">{errorOrder ?? stateTrans}</p>
          </div>
        )}

        {!loadingOrder && !errorOrder && MessageOrder && (
          <div className="text-green-600">
            <p className="text-xl font-semibold">Payment Successful!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense
      fallback={
        <p className="text-xl font-semibold">Loading payment page...</p>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
