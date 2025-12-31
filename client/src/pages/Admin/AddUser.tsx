import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetAllRole } from "@/slice/RoleSlice";
import { authSchema, signupSchema, signupSchemaAdmin } from "@/schema/auth";
import { fetchCreateAUserAdmin } from "@/slice/UserSlice";
import Loading from "@/components/ui/Loading";

export default function addUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<boolean|string>(true);
  const dispatch = useAppDispatch();
  const {roles,loadingRole} = useAppSelector(state=>state.RoleSlice);
  const {loadingUser} = useAppSelector(state=>state.UserSlice);
  const handleSubmit = async() => {
    if (!name || !email || !address || !phone) {
      toast.error("Hãy nhập đầy đủ thông tin");
      return;
    }
    const check = signupSchemaAdmin.safeParse({
      email,
      name,
      address,
      phone,
      role,
      status,
    });
    if (!check.success) {
      toast.error(check.error.issues[0].message);
      return;
    }
    const statusBoolean = String(status) === "true";
    const {type} =await dispatch(fetchCreateAUserAdmin({
      email,
      name,
      address,
      phone,
      role_id: role,
      status: statusBoolean,
      password: "123456",
    }))
    if(type.search("rejected") == -1){
      toast.success("Thêm user thành công");
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setRole("");
      setStatus(true);
    }
  };
  useEffect(()=>{
    dispatch(fetchGetAllRole());
  },[])
  return (
    <>
    
    {(loadingUser||loadingRole)&&<Loading/>}
     <div className="flex flex-col gap-3 p-6 max-w-6xl mx-auto bg-white mt-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Add New User</h1>
        <p className="text-slate-500 text-sm">Create a new user account.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-900 mb-1.5 block">
            Name
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-900 mb-1.5 block">
            Email
          </Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-900 mb-1.5 block">
            Password
          </Label>
          <Input
            value="123456"
            disabled
            type="text"
            id="password"
            className="bg-slate-100 text-slate-500 cursor-not-allowed"
          />
          <p className="text-xs text-slate-500 mt-1">Default password is set to 123456</p>
        </div>

        <div>
          <Label htmlFor="address" className="text-gray-900 mb-1.5 block">
            Address
          </Label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            id="address"
            placeholder="123 Main St, City, Country"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-gray-900 mb-1.5 block">
            Phone
          </Label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            id="phone"
            placeholder="Số điện thoại"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role" className="text-gray-900 mb-1.5 block">
              Role
            </Label>
            <Select 
            
            value={role} onValueChange={e=>{
              setRole(e);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles && roles.length > 0 && roles.map((role) => (
                  <SelectItem key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" className="text-gray-900 mb-1.5 block">
              Status
            </Label>
            <Select value={String(status)} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"true"}>Hoạt động</SelectItem>
                <SelectItem value={"false"}>Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          variant={"ghost"}
          className="bg-gray-900 w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 rounded border-2 border-gray-900 cursor-pointer transition-all"
        >
          Add User
        </Button>
      </div>
    </div>
    </>
  );
}
