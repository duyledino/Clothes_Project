"use client";
import React from "react";

const DATA = [
  { inv: "INV-8832", prod: "PRD-901", name: "Áo thun nam", qty: 128, created: "2023-10-21", updated: "2 hours ago" },
  { inv: "INV-8833", prod: "PRD-442", name: "Quần jean nữ", qty: 5, created: "2023-09-12", updated: "1 day ago" },
  { inv: "INV-8835", prod: "PRD-998", name: "Áo khoác", qty: 0, created: "2023-08-15", updated: "Yesterday" },
];

function getStatus(qty: number) {
  if (qty === 0) return { text: "Out of Stock", cls: "bg-red-100 text-red-800" };
  if (qty <= 10) return { text: "Low Stock", cls: "bg-yellow-100 text-yellow-800" };
  return { text: "In Stock", cls: "bg-green-100 text-green-800" };
}

export default function Inventory() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Inventory</h1>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Add Product
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>Product</Th>
              <Th>IDs (Inv / Prod)</Th>
              <Th>Status</Th>
              <Th>Quantity</Th>
              <Th>Dates</Th>
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {DATA.map((x) => {
              const st = getStatus(x.qty);
              return (
                <tr key={x.inv + x.prod} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium">{x.name}</div>
                    <div className="text-sm text-gray-500">Clothes</div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div>Inv: <span className="font-mono">{x.inv}</span></div>
                    <div className="text-gray-500">Prod: <span className="font-mono">{x.prod}</span></div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${st.cls}`}>
                      {st.text}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <b>{x.qty}</b> units
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>Created: {x.created}</div>
                    <div className="text-xs">Updated: {x.updated}</div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-500 hover:text-blue-600">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
      {children}
    </th>
  );
}
