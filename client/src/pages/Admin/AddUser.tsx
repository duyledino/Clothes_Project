import React, { useState } from "react";
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

export default function addUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("Customer");
  const [status, setStatus] = useState("Active");

  const handleSubmit = () => {
    if (!name || !email || !address) {
      toast.error("Hãy nhập đầy đủ thông tin");
      return;
    }
    // Logic to add user would go here
    console.log({
      name,
      email,
      password: "123456",
      address,
      role,
      status
    });
    toast.success("Thêm user thành công");
  };

  return (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role" className="text-gray-900 mb-1.5 block">
              Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" className="text-gray-900 mb-1.5 block">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
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
  );
}
