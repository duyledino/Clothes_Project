"use client";
import React, { useMemo } from "react";

type OrderStatus = "Shipped" | "Pending" | "Cancelled";

type OrderItem = {
  productId: string;
  name: string;
  size: string;
  color: string;
  price: number;
  qty: number;
  thumb: string;
};

export default function OrderDetail() {
  // ===== dữ liệu tĩnh (sau này thay bằng API) =====
  const order = {
    code: "ORD-2023-001",
    status: "Shipped" as OrderStatus,
    placedAt: "Oct 24, 2023 at 10:23 AM",
    customer: {
      name: "Jane Doe",
      since: "Customer since 2021",
      email: "jane@example.com",
      phone: "+1 (555) 000-1234",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZbMd7uL89kQqV_sH-T1kCnh8JiSpKl2hLZPcRIo35MbcG-ZykE-Ly5u1nHQGtKyTdalLb61m1VU6UrEw_T9XRpbPay2Gt50g14rDM84Zb8pKuzq5ftTLxb9s9Lc0JTIb_uoEjtskNAAgIXe33-Zt9Dmp2sMSVyWa1_fNZn4MZarhdnuH6a5YDxCVn-U9kGb3BE_xHtmjjktamKtCo-y5xXbaoqPPduQB3RNhG1_1UHPDCUJnjWkHOXgWhzKxf0zfFdWirXvX_yQ",
    },
    shippingAddress: `Jane Doe
123 Market Street, Suite 400
San Francisco, CA 94103
United States`,
    payment: {
      brand: "Mastercard",
      last4: "4242",
      status: "Paid",
      txnId: "TXN-8839201",
      date: "Oct 24, 2023",
    },
    history: [
      {
        title: "Order Shipped",
        detail: "Oct 25, 2023 at 2:00 PM • Courier: FedEx (Tracking: #9928123)",
        dot: "green",
      },
      {
        title: "Payment Confirmed",
        detail: "Oct 24, 2023 at 10:25 AM • Visa ****4242",
        dot: "primary",
      },
      {
        title: "Order Placed",
        detail: "Oct 24, 2023 at 10:23 AM • by Jane Doe",
        dot: "muted",
      },
    ] as const,
  };

  const items: OrderItem[] = [
    {
      productId: "MO-293-WL",
      name: "Ergo Wireless Mouse",
      size: "Standard",
      color: "Graphite",
      price: 45,
      qty: 2,
      thumb:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDgCL5OFQEHVm3gcbPHbfM0hSPD-NGDolk-771U6qiL-sZezTssVhhKTwkEztXXMrAbV4qKFRw6eue0yny7Qhx7ZneHo3wPE-hHljzO7wGh0ax_6M5I5k2jkeCR7GYFTM7AwMq2c1QxhEBx6BsVsrkOtcqI5TuHlqCud1zNeSP8Ucgy3BywTCdQRHYFQAqp6jZawJNOj71dONRPvaf_FqNrUkOVBDg6q4XY2BT-8R3DfusX4oL2h7kULuj03OqWGPBhhHOWN9ncnw",
    },
    {
      productId: "KB-991-RGB",
      name: "Mechanical Keyboard Pro",
      size: "Full Size",
      color: "Black RGB",
      price: 120,
      qty: 1,
      thumb:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKD4lLs9bUAOvMvoMkCPu2jrFM5q2t8lCDXAg7NL6yd1GIeUc-tmIXvkL0BQ4Rq5ZAgzp61R-9vQjfBXEbwP1SQw2NLW2e_lES5vm_CCw-95BOMsRicD0Kwh2uF0VUgEq9qBLGyM2AQngysWfOdtt7IgJv7IXSju2v7xbHgZyRNPFJcizzkd0RGAscwHUvgDgwddCq_0XsP-AWKvX-_KHRIvGGDAHXZB6_9cbzgIqmU49EOhYhxyEMhCkI-VcPZ3KQi9BSHypD8g",
    },
    {
      productId: "CB-002-2M",
      name: "USB-C Braided Cable",
      size: "2 Meters",
      color: "Black",
      price: 15,
      qty: 3,
      thumb:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCuHNuNW3QP5UbYMA1A-yvuUwBJxue5Fiz268ex5540kyIPYO2idi2-7Z8Wt2EL7WPFEjIfZ2c970jAe4VSFS7lQ9s5zFn_6Cltk9nlMi6215UIZhyBo5IYIJkC3nQQHF5KOX761sbpOfRPwB3NuPvVeiZp__LvIqan7lEoTL2i-j0za7cZoJKPQVOqHopu0Bu5q6OiMOx59IiRH8vDRZtG8moy1GdG-70p8SKgVX7dFCgiDrp0Ve_ht8EhhtQ6GJ9__wp1MFOCxg",
    },
  ];

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const shipping = 15;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const statusBadge =
    order.status === "Shipped"
      ? "bg-green-100 text-green-700 border-green-200"
      : order.status === "Pending"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-red-100 text-red-700 border-red-200";

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-[#111318]">
      {/* Header (tĩnh) */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="flex size-8 items-center justify-center rounded bg-[#135bec]/10 text-[#135bec]">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">Inventory Manager</h2>
          </div>

          <div className="hidden md:flex min-w-[320px] items-center rounded-lg bg-[#f6f6f8] px-3 py-2">
            <span className="material-symbols-outlined text-[#616f89]">search</span>
            <input
              className="w-full border-none bg-transparent px-2 text-sm outline-none placeholder:text-[#616f89]"
              placeholder="Search orders, products..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#f6f6f8] text-[#616f89]">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white" />
          </button>
          <div
            className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbCsUKFUXORIehQfCE0cqiZVDZ9afh_hMeA72ErvdCminl-hidv6ZeD8Zjn92qJZoPA2tPm9Z1YT2g2JctrSlXMyOoTF1rVaqPk0PrNLITaf1QeTXhM-lmixdG9grbHvxxS00pP9FY-B-V3cZhvwWG6pGF_6fN2qP24TtN6nKhE4WD8JntYN6ca3WChfkn94JcEED8IHbiJfN0QRWj1aZqGYS6_43UFYecZTx23x-GOCGhYLcu5-9Y33PS3psmDbmRlUbNEzpk7w')",
            }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="p-4 md:p-8 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-[#616f89]">
            <span className="hover:text-[#135bec] cursor-pointer">Home</span>
            <span className="material-symbols-outlined text-sm mx-2">chevron_right</span>
            <span className="hover:text-[#135bec] cursor-pointer">Orders</span>
            <span className="material-symbols-outlined text-sm mx-2">chevron_right</span>
            <span className="text-[#111318]">Order #{order.code}</span>
          </nav>

          {/* Title + actions */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black tracking-tight">Order #{order.code}</h1>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold border ${statusBadge}`}>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  {order.status}
                </span>
              </div>
              <p className="mt-2 text-[#616f89]">
                Placed on <span className="font-medium text-[#111318]">{order.placedAt}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <BtnGhost icon="print" text="Print Order" />
              <BtnGhost icon="receipt_long" text="Generate Invoice" />
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#135bec] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
                Update Status
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
                <div className="border-b border-[#e5e7eb] px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold">Order Items</h3>
                  <span className="text-sm text-[#616f89] font-medium">{items.length} Items</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#f6f6f8] text-[#616f89] border-b border-[#e5e7eb]">
                      <tr>
                        <th className="px-6 py-3 font-medium">Product ID</th>
                        <th className="px-6 py-3 font-medium w-1/3">Product</th>
                        <th className="px-6 py-3 font-medium">Size</th>
                        <th className="px-6 py-3 font-medium">Color</th>
                        <th className="px-6 py-3 font-medium text-right">Price</th>
                        <th className="px-6 py-3 font-medium text-center">Qty</th>
                        <th className="px-6 py-3 font-medium text-right">Total</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#e5e7eb]">
                      {items.map((it) => (
                        <tr key={it.productId} className="hover:bg-[#f6f6f8]/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-[#616f89]">{it.productId}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div
                                className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-[#e5e7eb] bg-cover bg-center"
                                style={{ backgroundImage: `url('${it.thumb}')` }}
                              />
                              <p className="font-bold">{it.name}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#616f89]">{it.size}</td>
                          <td className="px-6 py-4 text-[#616f89]">{it.color}</td>
                          <td className="px-6 py-4 text-right font-medium">${it.price.toFixed(2)}</td>
                          <td className="px-6 py-4 text-center text-[#616f89]">{it.qty}</td>
                          <td className="px-6 py-4 text-right font-bold">${(it.price * it.qty).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="flex flex-col items-end border-t border-[#e5e7eb] bg-[#f6f6f8]/30 px-6 py-6">
                  <div className="w-full max-w-xs space-y-3">
                    <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                    <Row label="Shipping" value={`$${shipping.toFixed(2)}`} />
                    <Row label="Tax (8%)" value={`$${tax.toFixed(2)}`} />
                    <div className="border-t border-[#e5e7eb] pt-3 flex justify-between items-center">
                      <span className="text-base font-bold">Total Amount</span>
                      <span className="text-xl font-black text-[#135bec]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm p-6">
                <h3 className="mb-4 text-lg font-bold">Order History</h3>
                <div className="relative pl-4 border-l border-[#e5e7eb] space-y-6">
                  {order.history.map((h, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={[
                          "absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white",
                          h.dot === "green"
                            ? "bg-green-500"
                            : h.dot === "primary"
                            ? "bg-[#135bec]"
                            : "bg-gray-300",
                        ].join(" ")}
                      />
                      <p className="text-sm font-bold">{h.title}</p>
                      <p className="text-xs text-[#616f89] mt-0.5">{h.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              {/* Customer */}
              <Card title="Customer Details">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full bg-cover bg-center bg-gray-200"
                      style={{ backgroundImage: `url('${order.customer.avatar}')` }}
                    />
                    <div>
                      <p className="font-bold">{order.customer.name}</p>
                      <p className="text-sm text-[#616f89]">{order.customer.since}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#616f89] text-[20px]">mail</span>
                      <a className="text-sm font-medium text-[#135bec] hover:underline" href={`mailto:${order.customer.email}`}>
                        {order.customer.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#616f89] text-[20px]">call</span>
                      <p className="text-sm">{order.customer.phone}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Delivery */}
              <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                <div className="border-b border-[#e5e7eb] px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold">Delivery Info</h3>
                  <button className="text-xs font-bold text-[#135bec] hover:text-blue-700">Edit</button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#616f89] mb-2">
                      Shipping Address
                    </p>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{order.shippingAddress}</p>
                  </div>
                  <div className="border-t border-[#e5e7eb] pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#616f89] mb-2">
                      Billing Address
                    </p>
                    <p className="text-sm leading-relaxed">Same as shipping address</p>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <Card title="Payment Info">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100 border border-[#e5e7eb]">
                        <span className="material-symbols-outlined text-gray-500">credit_card</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{order.payment.brand}</p>
                        <p className="text-xs text-[#616f89]">**** {order.payment.last4}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      {order.payment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-[#616f89]">Transaction ID</p>
                      <p className="text-sm font-medium truncate" title={`#${order.payment.txnId}`}>
                        #{order.payment.txnId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#616f89]">Payment Date</p>
                      <p className="text-sm font-medium">{order.payment.date}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BtnGhost({ icon, text }: { icon: string; text: string }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-[#f6f6f8] transition-colors">
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      {text}
    </button>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
      <div className="border-b border-[#e5e7eb] px-6 py-4">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#616f89]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
