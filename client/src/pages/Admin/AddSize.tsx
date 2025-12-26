import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export default function AddSize() {
  const [sizeName, setSizeName] = useState("");

  const handleSubmit = () => {
    if (!sizeName) {
      toast.error("Size name is required");
      return;
    }
    toast.success("Add size logic here");
  };

  return (
    <div className="flex flex-col gap-3 p-6 mx-auto bg-white mt-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Add New Size</h1>
        <p className="text-slate-500 text-sm">Create a new size option.</p>
      </div>

      <div className="mb-4">
        <Label htmlFor="sizeName" className="text-gray-900 mb-1.5 block">
          Size Name
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
  );
}
