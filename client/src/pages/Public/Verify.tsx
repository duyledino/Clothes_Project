import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { verify } from "@/slice/AuthSlice";

const Verify = () => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state=>state.AuthSlice);
  const [result,setResult] = useState("");
    const router = useNavigate();
    const [params] = useSearchParams();
    console.log("user_id,token,params: ",params.get("user_id"),params.get("token"));
  useEffect(()=>{
    const handleSubmit = async ()=>{
        if(!params.get("user_id") || params.get("user_id")==="" || !params.get("token") || params.get("token")===""){
        // router("/");
        toast.error("Không có mã xác thực hợp lệ");
        return;
    }
    const {type} = await dispatch(verify({token: params.get("token")!,user_id: params.get("user_id")!}));
    if(type.search("reject")===-1){
        router("/");
        setResult("Xác thực tài khoản thành công");
        // toast.success("Xác thực tài khoản thành công");
    }else{
        setResult("Xác thực tài khoản thất bại");
        // toast.error("Xác thực tài khoản thất bại");
    }
    };
    handleSubmit();
  },[params.get("user_id"),params.get("token")])

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="flex min-h-screen bg-white items-center justify-center">
        <div className="container mx-auto p-8 my-16 max-w-md bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Xác thực tài khoản
          </h2>
            {result === "" ? <p className="text-center mt-6 text-xl font-semibold text-gray-900">Đang xác thực tài khoản...</p> : 
                      <p className="text-center mt-6 text-xl font-semibold text-gray-900">{result}</p>

            }
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

export default Verify;
