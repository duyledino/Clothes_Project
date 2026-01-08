import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authSchema } from "@/schema/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { login, sendVerifyForgetPasswordMail } from "@/slice/AuthSlice";
import Loading from "@/components/ui/Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailForgetPassword, setEmailForgetPassword] = useState("");
  const { loading } = useAppSelector((state) => state.AuthSlice);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkResult = authSchema.safeParse(formData);
    if (!checkResult.success) {
      toast.error(checkResult.data);
    } else {
      const { type } = await dispatch(login(formData));
      if (type.search("reject") == -1) {
        router("/");
      }
    }
    setFormData({ email: formData.email, password: "" });
  };
  const handleSendMail=async()=>{
    if(emailForgetPassword===""){
      toast.error("Email không được để trống");
      return;
    }
    const {type} = await dispatch(sendVerifyForgetPasswordMail({email: emailForgetPassword}));
    if(type.search("reject") == -1){
      setOpenModal(false);
      router("/Login");
    }
    
  }
  return (
    <>
      {loading ? <Loading /> : ""}

      <div className="flex min-h-screen bg-white">
        <div className="container flex flex-col justify-center mx-auto p-8 my-16 max-w-md">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Login to Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="block w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition duration-200 font-semibold"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Link to="/Signup" className="text-gray-900 underline">
              Đăng ký
            </Link>
          </p>
          <p className="text-center mt-4 text-gray-600">
            Quên mật khẩu?{" "}
            <Button 
            onClick={()=>{setOpenModal(true)}}
            variant={"ghost"} className="text-gray-900 underline">
              Quên mật khẩu
            </Button>
          </p>
        </div>
      </div>
     {openModal ?
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={() => setOpenModal(false)} />
            
            <div 
                className="bg-card text-card-foreground border border-border w-full max-w-md rounded-xl shadow-lg p-6 space-y-6 relative z-10 animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="text-base font-medium leading-relaxed">
                    Nhập email của bạn
                </div>
                <div className="flex">
                  <input type="email" value={emailForgetPassword} onChange={(e) => setEmailForgetPassword(e.target.value)} placeholder="Email" className="block w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        onClick={() => setOpenModal(false)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-transparent shadow-sm"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={()=>{handleSendMail()}}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </div>
     :""}
    </>
  );
};

export default Login;
