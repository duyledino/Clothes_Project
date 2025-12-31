import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchCreateARole } from "@/slice/RoleSlice";
import Loading from "@/components/ui/Loading";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddRole() {
  const [roleName, setRoleName] = useState("");
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { loadingRole } = useAppSelector((state) => state.RoleSlice);
  const handleSubmit = async () => {
    if (!roleName) {
      toast.error("Thiếu tên role");
      return;
    }
    // toast.success("Add role logic here");
    const { type } = await dispatch(fetchCreateARole({ role_name: roleName }));
    if (type.search("reject") == -1) {
      setRoleName("");
    }
  };

  return (
    <>
      {loadingRole && <Loading />}
      <div className="flex flex-col gap-3 p-6 max-w-6xl mx-auto bg-white rounded-lg mt-6">
        <div className="mb-4">
          <Button
            onClick={() => {
              router(-1);
            }}
            variant={"ghost"}
            className=" font-bold hover:text-white hover:bg-slate-900 cursor-pointer text-slate-900"
          >
            <ArrowLeft />
          </Button>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Thêm vai trò</h1>
          <p className="text-slate-500 text-sm">Tạo thêm 1 vai trò mới.</p>
        </div>

        <div className="mb-3">
          <Label htmlFor="roleName" className="text-gray-900 mb-1.5 block">
            Tên Role
          </Label>
          <Input
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            type="text"
            id="roleName"
            placeholder="e.g. Moderator"
            className="mt-1"
          />
        </div>

        <Button
          onClick={handleSubmit}
          variant={"ghost"}
          className="bg-gray-900 w-full text-white hover:bg-transparent  uppercase font-semibold py-6 rounded border-2 border-gray-900 cursor-pointer transition-all"
        >
          Create Role
        </Button>
      </div>
    </>
  );
}
