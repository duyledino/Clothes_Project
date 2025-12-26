import React from "react";
import { CheckCircle } from "lucide-react";

// Mock data
const DONE_ORDERS = [
  { id: "1020", customer: "Frank Castle", date: "2023-12-20", completed_at: "2023-12-22", total: "$150.00" },
  { id: "1021", customer: "Matt Murdock", date: "2023-12-21", completed_at: "2023-12-23", total: "$80.00" },
];

export default function DoneOrders() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Done Orders</h1>
        <p className="text-slate-500">History of orders you have successfully delivered.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Completed At</th>
               <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {DONE_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">#{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4 text-slate-500">{order.completed_at}</td>
                 <td className="px-6 py-4 font-medium">{order.total}</td>
                <td className="px-6 py-4 text-right">
                   <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} />
                    Delivered
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
