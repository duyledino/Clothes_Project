import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export default function AddRole() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!roleName) {
      toast.error("Role name is required");
      return;
    }
    toast.success("Add role logic here");
  };

  return (
    <div className="flex flex-col gap-3 p-6 max-w-6xl mx-auto bg-white rounded-lg mt-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Add New Role</h1>
        <p className="text-slate-500 text-sm">Create a new role for the system.</p>
      </div>

      <div className="mb-3">
        <Label htmlFor="roleName" className="text-gray-900 mb-1.5 block">
          Role Name
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

      <div className="mb-4">
        <Label htmlFor="description" className="text-gray-900 mb-1.5 block">
          Description
        </Label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          placeholder="Describe the role permissions..."
          className="mt-1 min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#135bec] disabled:cursor-not-allowed disabled:opacity-50"
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
  );
}
