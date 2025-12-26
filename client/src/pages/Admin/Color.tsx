import React, { useState } from "react";
import { Plus, Search, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const MOCK_COLORS = [
  { color_id: "1", color_name: "Red", hex_code: "#ef4444" },
  { color_id: "2", color_name: "Blue", hex_code: "#3b82f6" },
  { color_id: "3", color_name: "Green", hex_code: "#22c55e" },
  { color_id: "4", color_name: "Black", hex_code: "#000000" },
  { color_id: "5", color_name: "White", hex_code: "#ffffff" },
];

export default function Color() {
  const [query, setQuery] = useState("");
  const router = useNavigate();
  return (
    <div className="flex h-[calc(100vh-0px)] w-full overflow-hidden bg-[#f6f6f8] text-slate-900">
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col gap-4 flex-shrink-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Color Management</h2>
              <p className="text-slate-500 text-sm mt-1">
                Manage product colors available in the system.
              </p>
            </div>
            <button
            onClick={()=>{
              router("AddColor")
            }}
            className="bg-[#135bec] hover:bg-[#135bec]/90 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
              <Plus size={20} strokeWidth={2.5} />
              Add New Color
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-2">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-slate-100 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#135bec] text-sm"
                placeholder="Search by color name..."
                type="text"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto bg-slate-50 p-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-24">
                      ID
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                      Color Name
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                      Preview
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-24 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {MOCK_COLORS.map((item) => (
                    <tr
                      key={item.color_id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        #{item.color_id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {item.color_name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full border border-slate-200 shadow-sm"
                            style={{ backgroundColor: item.hex_code }}
                          />
                          <span className="text-xs text-slate-500 font-mono">
                            {item.hex_code}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="text-slate-400 hover:text-[#135bec] transition-colors">
                            <Pencil size={18} />
                          </button>
                          <button className="text-slate-400 hover:text-red-500 transition-colors">
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
