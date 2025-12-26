import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export default function AddColor() {
  const [colorName, setColorName] = useState("");
  const [hexCode, setHexCode] = useState("#000000");

  const handleSubmit = () => {
    if (!colorName) {
      toast.error("Color name is required");
      return;
    }
    toast.success(`Color added: ${colorName} (${hexCode})`);
  };

  return (
    <div className="flex flex-col gap-3 p-6 max-w-6xl mx-auto mt-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Add New Color</h1>
        <p className="text-slate-500 text-sm">Create a new color option.</p>
      </div>

      <div className="mb-3">
        <Label htmlFor="colorName" className="text-gray-900 mb-1.5 block">
          Color Name
        </Label>
        <Input
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          type="text"
          id="colorName"
          placeholder="e.g. Midnight Blue"
          className="mt-1"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="hexCode" className="text-gray-900 mb-1.5 block">
          Color Picker
        </Label>
        <div className="flex items-center gap-4 mt-1">
          <div className="h-10 w-20 relative overflow-hidden rounded-md border border-slate-200 shadow-sm">
            <input
              type="color"
              id="hexCode"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              className="absolute -top-2 -left-2 w-[150%] h-[150%] cursor-pointer p-0 border-0"
            />
          </div>
          <Input
            value={hexCode}
            onChange={(e) => setHexCode(e.target.value)}
            type="text"
            className="w-32 font-mono uppercase"
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Pick a color using the swatch or enter a hex code.
        </p>
      </div>

      <Button
        onClick={handleSubmit}
        variant={"ghost"}
        className="bg-gray-900 w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 rounded border-2 border-gray-900 cursor-pointer transition-all"
      >
        Create Color
      </Button>
    </div>
  );
}
