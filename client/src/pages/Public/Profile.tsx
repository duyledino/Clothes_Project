import React, { useEffect, useState } from "react";
import UserInfo from "@/components/guest/UserInfo";
import UserOrder from "@/components/guest/UserOrder";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import { fetchGetOrdersByUserId, fetchUpdateOrder } from "@/slice/OrderSlice";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/guest/Modal";
import { fetchApiPaymentURL } from "@/slice/PaymentSlice";
import { updateUserSchema } from "@/schema/auth";
import { fetchUserById, resetUserState } from "@/slice/UserSlice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { popStore, resetStore } from "@/slice/StoreSlice";
import type { paymentAndStatus } from "@/type/types.frontend";
import { auth, logout, sendVerifyMail } from "@/slice/AuthSlice";

const Profile = () => {
  const [param, setParam] = useState<paymentAndStatus>({
    order_id: "",
    payment: "",
    status: "",
  });
  const router = useNavigate();
  const { user, loading } = useAppSelector((state) => state.AuthSlice);
  const [process, setProcess] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [localStore, setLocalStore] = useState<string | null>(null);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const user = localStorage.getItem("user");
  //     console.log("user: ", user);
  //     setLocalStore(localStorage.getItem("user"));
  //   }
  // }, []);
  const { MessageOrder, loadingOrder, errorOrder, OrdersUser } = useAppSelector(
    (state) => state.OrderSlice
  );
  const { PaymentURL, paymentError, paymentLoading } = useAppSelector(
    (state) => state.PaymentSlice
  );
  const { User, errorUser, loadingUser } = useAppSelector(
    (state) => state.UserSlice
  );
  console.log("User in Profile: ", User);
  console.log("OrdersUser in Profile: ", OrdersUser);
  const dispatch = useAppDispatch();
  const handleChange = ({ order_id, status, payment }: paymentAndStatus) => {
    console.log("id, status, payment: ", order_id, status, payment);
    if (!user || !user.user) {
      toast.error("Hãy đăng nhập để thực hiện thao tác này");
      router("/login");
      return;
    }
    if (payment === "" || order_id === "" || status === "") {
      toast.error("Không thể chỉnh sửa đơn hàng");
      return;
    }
    // const token = JSON.parse(localStore).token;
    dispatch(
      fetchUpdateOrder({
        order_id,
        payment: "canceled",
        status: "canceled",
      })
    );
  };

  const handleVerifySendMail = async () => {
    // console.log("logout now");
    if (!User || !User.user_id || User.user_id ==="") {
      toast.error("Có lỗi xảy ra. Thiếu mã người dùng");
      return;
    }
    const { type } = await dispatch(sendVerifyMail({user_id: User.user_id}));
    if (type.search("reject") == -1) {
      // router("/");
      toast.success("Đã gửi");
    }
  };

  const handlePay = (order_id: string, total: number) => {
    if (order_id === "" || total === undefined) {
      toast.error("Không thể thah toán.");
      return;
    }
    // if (localStore === undefined || localStore === null) {
    //   toast.error("No token");
    //   return;
    // }
    dispatch(fetchApiPaymentURL({ order_id: order_id, total: total }));
  };
  useEffect(() => {
    if (errorOrder) {
      toast.error(errorOrder);
    }
    if (MessageOrder && !errorOrder) {
      // if (localStore === undefined || localStore === null) {
      //   toast.error("No token");
      //   return;
      // }
      setOpen(false);
      dispatch(fetchGetOrdersByUserId({ user_id: user?.user.user_id! }));
      toast.success(MessageOrder);
    }
  }, [errorOrder, MessageOrder]);
  useEffect(() => {
    // if (localStore === undefined || localStore === null) {
    //   return;
    // }
    dispatch(fetchGetOrdersByUserId({ user_id: user?.user.user_id! }));
    const storageChange = () => {
      const result = localStorage.getItem("payment_result");
      if (result !== null || result !== undefined) {
        setProcess(false);
        dispatch(fetchGetOrdersByUserId({ user_id: user?.user.user_id! }));
        toast.info(JSON.parse(result as string));
        localStorage.removeItem("payment_result");
      }
    };
    dispatch(fetchUserById({ user_id: user?.user.user_id! }));
    window.addEventListener("storage", storageChange);
    return () => window.removeEventListener("storage", storageChange);
  }, [localStore]);
  useEffect(() => {
    if (paymentError) {
      toast.error(paymentError);
    }
    if (PaymentURL && !paymentError) {
      setProcess(true);
      window.location.href = PaymentURL;
    }
  }, [paymentError, PaymentURL]);
  console.log("OrderUser: ", OrdersUser);
  return (
    <>
      {process && <Loading />}
      {loading && <Loading />}
      {loadingOrder && <Loading />}
      {loadingUser && <Loading />}
      <Modal
        handleClick={handleChange}
        content="Hành động này không thể quay lại!"
        open={open}
        setOpen={setOpen}
        params={param}
      />

      {user && user?.user ? (
        <div className="container mx-auto">
          <div className="w-full pt-14 md:px-0 px-4">
            {User &&
            User.isVerify === false ? (
              <div className="w-full flex justify-end">
                <Button
                  type="button"
                  onClick={handleVerifySendMail}
                  className="bg-gray-900 w-fit rounded-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 border-2 border-gray-900 cursor-pointer"
                >
                  Xác thực tài khoản
                </Button>
              </div>
            ) : (
              ""
            )}
            {User === null ? (
              <UserInfo
              isVerify={false}
                address=""
                user_id="123"
                email="test@example.com"
                name="Test User"
                phone="123"
              />
            ) : (
              <UserInfo
              isVerify={User.isVerify}
                address={User.address}
                user_id={User.user_id}
                email={User.email}
                name={User.name}
                phone={User.phone}
              />
            )}
            {OrdersUser.length === 0 ? (
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1>Chưa có đơn hàng nào cả.</h1>
              </div>
            ) : (
              OrdersUser.map((item) => (
                <UserOrder
                  key={item.order_id}
                  handlePay={handlePay}
                  setParam={setParam}
                  setOpen={setOpen}
                  OrderUser={{
                    delivered_date: item.delivered_date,
                    method: item.method,
                    create_at: item.create_at,
                    update_at: item.update_at,
                    order_id: item.order_id,
                    user_create: item.user_create,
                    user_ship: item.user_ship,
                    order_detail: item.order_detail,
                    payment: item.payment,
                    status: item.status,
                    total: item.total,
                  }}
                  // date={item.update.toLocaleString().split("T")[0]}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;
