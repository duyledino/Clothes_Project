import React from "react";
import { Package } from "lucide-react";

// Mock data
const PREPARE_ORDERS = [
  { id: "1028", customer: "Alice Smith", date: "2023-12-25", items: 3, total: "$120.00", status: "Processing" },
  { id: "1029", customer: "Bob Jones", date: "2023-12-26", items: 1, total: "$45.00", status: "Paid" },
];

export default function PrepareOrders() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Prepare Orders</h1>
        <p className="text-slate-500">Orders that need to be packed and assigned for shipping.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PREPARE_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">#{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4 text-slate-500">{order.date}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#135bec] font-bold text-sm hover:underline">
                    Take Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
