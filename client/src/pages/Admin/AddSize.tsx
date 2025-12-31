import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchCreateASize, fetchGetASize } from "@/slice/SizeSlice";
import Loading from "@/components/ui/Loading";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddSize() {
  const [sizeName, setSizeName] = useState("");
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { loadingSize } = useAppSelector((state) => state.SizeSlice);
  const handleSubmit = async () => {
    if (!sizeName) {
      toast.error("Tên Size bị thiếu");
      return;
    }
    const { type } = await dispatch(
      fetchCreateASize({
        size_name: sizeName.toUpperCase(),
      })
    );
    if (type.search("reject") == -1) {
      setSizeName("");
    }
  };

  return (
    <>
      {loadingSize && <Loading />}
      <div className="flex flex-col gap-3 p-6 mx-auto bg-white mt-6">
        <div className="mb-4">
          <Button
          onClick={()=>{
            router(-1);
          }}
          variant={"ghost"}
          className=" font-bold hover:text-white hover:bg-slate-900 cursor-pointer text-slate-900">
            <ArrowLeft/>
          </Button>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Tạo size</h1>
          <p className="text-slate-500 text-sm">Tạo 1 size mới sản phẩm cho cửa hàng.</p>
        </div>

        <div className="mb-4">
          <Label htmlFor="sizeName" className="text-gray-900 mb-1.5 block">
            Tên size
          </Label>
          <Input
            value={sizeName}
            onChange={(e) => setSizeName(e.target.value)}
            type="text"
            id="sizeName"
            placeholder="e.g. XL"
            className="mt-1"
          />
        </div>
        <Button
          onClick={handleSubmit}
          variant={"ghost"}
          className="bg-gray-900 w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 rounded border-2 border-gray-900 cursor-pointer transition-all"
        >
          Create Size
        </Button>
      </div>
    </>
  );
}
