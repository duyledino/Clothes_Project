"use client";
import React, { useMemo, useState } from "react";

type Product = {
  status: "In Stock" | "Low Stock" | "Out of Stock";
  sku: string;
  name: string;
  category: string;
  productId: string;
  price: number;
  images: string[];
  description: string[];
  materialCare: string[];
  features: string[];
  origin: string;
};

const PRODUCT: Product = {
  status: "In Stock",
  sku: "APP-TSH-005",
  name: "Premium Cotton T-Shirt",
  category: "Apparel",
  productId: "#1029384",
  price: 24.99,
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCMdPdE3KGl8EfrFChkxfr2rxuI_cOh34X8HX4HVq-448rmd5jRf0KdGsu8PGIQyZD94cON7hIjtr32ey1xHbgc5BR3vzCPvNJEj9KPDDwIbKz4Hl058vofL27epxRQnzxYmpTnjvu7gFrPkiYp8GBDwFm_Xp-QjQ8BDydLEiuElIPo3RO2Oo5wolBKhajR1OXt_ZQi-Bmz18_5gsKl7gKG_mIgnt8H6RW54qOXfEJUpxtM704FV1Cwob9lDB2D_2tzxlHmP8uQpg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBELH__V4Y-5c130MzM8hPEtet1pTK7E9R5jreLaDLwl35g6vusCozEjo8qlPJFQ1CIJsFrXtxVJ8sI2BIllhVPFeJxl-zq88bmacXk9DocILUU7QBcQe-VMtkEoft0BaSofMNlv0-12uJ9M9BdI-gyTRK8bMBCqlWVzO1GYSHaMMZhMWOBzoJU0YAE67nkBAGrUbq0vBRAcxjAOxwo_etG8_YpnJN9kciVE9uEICSfO57o5nVbhp4hbUl1i7B_g3B3HKIVsozJ-w",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBfZSy-tV5PK3PHIg3HZWY1eznaLX9_hFWbTa3Tf2XTtrhfwJg7DpbdRjFlXD__Ul6-YI07Em3Pm_iDtA97hyr0zRZ1BNXqXtVwJ8k-Hc_OPM3YcbH_XwqtQ8ipP1x9I00UPMs5uCOPXUdZ3-DpO2X0x9Vuc8u-X2LUG9_8_mWD6a6MienEbYJNqUilZe5Xj_NkGh1R5eLfRKvVMaPIUKsOGBSdyVg1jecqBQGiCa9tB64egetIfBYc15QxeDrToA4b-4VFsk_Reg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAlQAkeOKQk1oswX_EtSiNC-mep2h6J4XklD_B2bIhtao66xb4enVY4VUaPzSIr8-0XUhhbKWIGPMPp0kvwNzyEOCRewE8LwtsFQRDULhMASVjv5s50VFY5_RhfdhEBkVVqRWUTGZI_LgOQt5yk8eZ5v2uhvTRgm8aaK77ZOAbbw9_U7A6rxXhPga6CHI2T2y1Bb3JdPByzwgdDFLdRIObiGkXf5lDze468j1S8wZTbaqKYC6kAr797_S42-HN7CNCWZvsZwi9YNQ",
  ],
  description: [
    "Elevate your everyday wardrobe with our Premium Cotton T-Shirt. Crafted from 100% organic combed cotton, this t-shirt offers an exceptionally soft feel against the skin and superior breathability for all-day comfort.",
    "Designed with a modern, tailored fit that isn't too tight or too loose, it features a ribbed crew neck collar with elastane for stretch and recovery. The double-needle stitching on the sleeves and bottom hem adds durability.",
  ],
  materialCare: ["100% Organic Cotton", "Machine wash cold", "Tumble dry low", "Do not bleach"],
  features: ["Tag-free neck label", "Reinforced shoulder seams", "Anti-pilling fabric", "Eco-friendly dyes"],
  origin: "Ethically manufactured in Portugal.\nCertified by GOTS (Global Organic Textile Standard).",
};

function ms(icon: string, fill = false) {
  return (
    <span className={`material-symbols-outlined ${fill ? "fill" : ""}`}>{icon}</span>
  );
}

export default function ProductDetail() {
  const [size, setSize] = useState<"L" | "XL" | "XXL">("XL");
  const [color, setColor] = useState("Navy Blue");
  const [activeImg, setActiveImg] = useState(0);

  const statusBadge = useMemo(() => {
    if (PRODUCT.status === "In Stock") return "bg-primary/10 text-primary";
    if (PRODUCT.status === "Low Stock") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  }, []);

  return (
    <div className="bg-[#f6f6f8] text-[#111318] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex">
          <ol className="flex items-center space-x-2">
            <li><span className="text-slate-500 text-sm font-medium">Inventory</span></li>
            <li><span className="text-slate-400 text-sm">/</span></li>
            <li><span className="text-slate-500 text-sm font-medium">Products</span></li>
            <li><span className="text-slate-400 text-sm">/</span></li>
            <li><span className="text-[#135bec] font-semibold text-sm">{PRODUCT.name}</span></li>
          </ol>
        </nav>

        {/* Main card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-2 bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-[#f0f2f4]">
          {/* Left */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`${statusBadge} px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide`}>
                  {PRODUCT.status}
                </span>
                <span className="text-slate-400 text-sm">SKU: {PRODUCT.sku}</span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {PRODUCT.name}
              </h1>

              <p className="text-slate-500 text-sm mt-1">
                Category: <span className="text-slate-900 font-medium">{PRODUCT.category}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Product ID</label>
                <div className="font-mono text-slate-900 font-medium">{PRODUCT.productId}</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Unit Price</label>
                <div className="text-xl font-bold text-slate-900">${PRODUCT.price.toFixed(2)}</div>
              </div>
            </div>

            {/* Size */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-900">Select Size</label>
                  <button className="text-xs text-[#135bec] hover:underline">Size Guide</button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(["L", "XL", "XXL"] as const).map((s) => {
                    const active = size === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={[
                          "rounded-lg px-4 py-3 text-center text-sm font-medium transition-all border",
                          active
                            ? "border-2 border-[#135bec] bg-[#135bec]/5 text-[#135bec] relative"
                            : "border-slate-200 bg-white text-slate-900 hover:border-[#135bec]",
                        ].join(" ")}
                      >
                        {s}
                        {active && s === "XL" && (
                          <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#135bec] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#135bec]"></span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Select Color</label>
                <div className="relative">
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="block w-full rounded-lg border-slate-200 bg-white text-slate-900 py-3 pl-4 pr-10 focus:border-[#135bec] focus:ring-[#135bec] sm:text-sm"
                  >
                    <option>Navy Blue</option>
                    <option>Heather Grey</option>
                    <option>Charcoal Black</option>
                    <option>Pure White</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    {ms("expand_more")}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="flex-1 bg-[#135bec] hover:bg-[#135bec]/90 text-white px-6 py-3.5 rounded-lg font-bold shadow-lg shadow-[#135bec]/20 transition-all flex items-center justify-center gap-2">
                {ms("edit_square")}
                Update Inventory
              </button>
              <button className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                {ms("print")}
                Print Details
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div className="aspect-[4/3] w-full bg-slate-50 rounded-2xl overflow-hidden relative group border border-slate-100 shadow-inner">
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-slate-600 hover:text-[#135bec] transition-colors">
                  {ms("zoom_in")}
                </button>
                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-slate-600 hover:text-[#135bec] transition-colors">
                  {ms("download")}
                </button>
              </div>

              <img
                alt={PRODUCT.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                src={PRODUCT.images[activeImg]}
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {PRODUCT.images.slice(0, 3).map((src, i) => {
                const isActive = activeImg === i;
                return (
                  <button
                    key={src}
                    onClick={() => setActiveImg(i)}
                    className={[
                      "aspect-square rounded-lg overflow-hidden border transition-all",
                      isActive ? "border-2 border-[#135bec]" : "border-transparent opacity-60 hover:opacity-100 hover:border-slate-300",
                    ].join(" ")}
                  >
                    <img className="w-full h-full object-cover" src={src} />
                  </button>
                );
              })}

              <button className="aspect-square rounded-lg bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-[#135bec] hover:border-[#135bec] hover:bg-[#135bec]/5 transition-all">
                {ms("add_photo_alternate")}
                <span className="text-[10px] font-medium mt-1">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-[#f0f2f4] shadow-sm p-6 lg:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#135bec]">description</span>
            Product Description
          </h2>

          <div className="prose prose-slate max-w-none">
            {PRODUCT.description.map((p, idx) => (
              <p key={idx} className="text-slate-600 leading-relaxed mb-4">{p}</p>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-100">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Material & Care</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                  {PRODUCT.materialCare.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Features</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                  {PRODUCT.features.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Origin</h3>
                <p className="text-sm text-slate-600 whitespace-pre-line">{PRODUCT.origin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Movements */}
        <div className="bg-white rounded-xl border border-[#f0f2f4] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#f0f2f4] flex justify-between items-center bg-slate-50/50">
            <h3 className="text-base font-bold text-slate-900">Recent Inventory Movements</h3>
            <button className="text-slate-500 hover:text-[#135bec] text-sm font-medium flex items-center gap-1">
              View Full History {ms("arrow_forward")}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Transaction Type</th>
                  <th className="px-6 py-3 font-semibold text-right">Qty Change</th>
                  <th className="px-6 py-3 font-semibold">Performed By</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Today, 10:23 AM</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                      Sale Order #4021
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-red-600 font-medium">-2</td>
                  <td className="px-6 py-4 text-slate-500">System</td>
                </tr>

                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Yesterday, 04:15 PM</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Restock Received
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-green-600 font-medium">+100</td>
                  <td className="px-6 py-4 text-slate-500">Warehouse Mgr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
