import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, User, Package, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShippingOrderDetail() {
  const { order_id } = useParams();
  const navigate = useNavigate();

  // Mock data for detail
  const order = {
    id: order_id,
    customer: "Charlie Day",
    phone: "+1 555-0199",
    address: "123 Main St, Philadelphia, PA 19147",
    create_at: "2023-12-24 10:30 AM",
    items: [
      { name: "Premium Cotton T-Shirt", quantity: 2, price: "$25.00" },
      { name: "Slim Fit Jeans", quantity: 1, price: "$45.00" },
    ],
    total: "$95.00",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Shipping Orders
      </button>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order #{order.id}</h1>
            <p className="text-slate-500 text-sm mt-1">Shipping Details</p>
          </div>
          <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Delivered
              </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid gap-8 md:grid-cols-2">
            {/* Customer Info */}
            <div className="space-y-6">
                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                        <User size={16} /> Customer Info
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="font-bold text-slate-900 text-lg">{order.customer}</p>
                        <p className="text-slate-600">{order.phone}</p>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                        <MapPin size={16} /> Delivery Address
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="text-slate-900 leading-relaxed">{order.address}</p>
                    </div>
                </section>

                 <section>
                    <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                        <Calendar size={16} /> Order Date
                    </h3>
                    <p className="text-slate-900 font-medium">{order.create_at}</p>
                </section>
            </div>

            {/* Order Items */}
            <div>
                 <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                        <Package size={16} /> Order Items
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs">
                            <tr>
                                <th className="px-4 py-2 font-semibold">Item</th>
                                <th className="px-4 py-2 font-semibold text-center">Qty</th>
                                <th className="px-4 py-2 font-semibold text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {order.items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-4 py-3 text-sm text-slate-900">{item.name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-900 text-center">{item.quantity}</td>
                                    <td className="px-4 py-3 text-sm text-slate-900 text-right">{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-slate-50 border-t border-slate-200">
                             <tr>
                                <td colSpan={2} className="px-4 py-3 text-sm font-bold text-slate-900 text-right">Total</td>
                                <td className="px-4 py-3 text-sm font-bold text-slate-900 text-right">{order.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
