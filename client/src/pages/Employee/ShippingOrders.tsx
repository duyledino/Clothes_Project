import React from "react";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";

// Mock data
const SHIPPING_ORDERS = [
  { id: "1025", customer: "Charlie Day", address: "123 Main St", date: "2023-12-24", status: "Shipping" },
  { id: "1026", customer: "Dennis R.", address: "456 Oak Ave", date: "2023-12-24", status: "Shipping" },
];

export default function ShippingOrders() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Shipping Orders</h1>
        <p className="text-slate-500">Orders currently being delivered by you.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SHIPPING_ORDERS.map((order) => (
          <Link to={`/Employee/ShippingOrders/${order.id}`} key={order.id}>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 text-[#135bec] rounded-lg group-hover:bg-[#135bec] group-hover:text-white transition-colors">
                    <Truck size={24} />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Order #{order.id}</h3>
              <p className="text-sm text-slate-500 mb-4">{order.customer}</p>
              
              <div className="text-sm text-slate-600">
                <p className="mb-1"><span className="font-semibold">Address:</span> {order.address}</p>
                <p><span className="font-semibold">Date:</span> {order.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
