import React, { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { verifyForgetPassword } from "@/slice/AuthSlice";

const ForgetPassword = () => {
    const router = useNavigate();
    const [params] = useSearchParams();
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(state=>state.AuthSlice);
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit =async(e: React.FormEvent) => {
    e.preventDefault();
    if(!params.get("user_id") || params.get("user_id")==="" || !params.get("token") || params.get("token")===""){
        router("/");
        toast.error("Không có mã xác thực hợp lệ");
        return;
    }
    if(password==="" || confirmPassword===""){
        toast.error("Mật khẩu không được để trống");
        return;
    }
    if(password.length < 6){
        toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        return;
    }
    if(password !== confirmPassword){
        toast.error("Mật khẩu không khớp");
        return;
    }
    const {type} =await dispatch(verifyForgetPassword({user_id:params.get("user_id")!,password:password,token:params.get("token")!}))
    if(type.search("reject") === -1){
        router("/Login");
        toast.success("Đổi mật khẩu thành công");
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="flex min-h-screen bg-white items-center justify-center">
        <div className="container mx-auto p-8 my-16 max-w-md bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Quên mật khẩu
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Mật khẩu mới của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition duration-200 font-semibold"
            >
              Gửi yêu cầu
            </Button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            <Link to="/Login" className="text-gray-900 underline">
              Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
