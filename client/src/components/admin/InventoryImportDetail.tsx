"use client";

import React from "react";

type ImportItem = {
  code: string;
  desc: string;
  unit: string;
  qty: number;
  price: number;
};

type ImportReceipt = {
  id: string; // "#RV-2023-001"
  date: string; // "24/10/2023"
  supplier: string;
  warehouse: string;
  po: string;
  note: string;
  items: ImportItem[];
  taxRate: number; // 0.1
};

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function InventoryImportDetail({
  receipt,
  onBack,
}: {
  receipt?: ImportReceipt;
  onBack?: () => void;
}) {
  const data: ImportReceipt =
    receipt ??
    ({
      id: "#RV-2023-001",
      date: "24/10/2023",
      supplier: "Công ty Acme",
      warehouse: "Kho Chính (HQ)",
      po: "PO-99823",
      note:
        "Hàng nhập đủ số lượng, kiểm tra ngoại quan không trầy xước. Đã nhập kho lúc 10:30 sáng. Bao bì nguyên vẹn.",
      items: [
        {
          code: "IPH-14-PRO-BLK",
          desc: "iPhone 14 Pro - Space Black - 128GB",
          unit: "CÁI",
          qty: 10,
          price: 999,
        },
        {
          code: "SAM-S23-ULT",
          desc: "Samsung Galaxy S23 Ultra - Green",
          unit: "CÁI",
          qty: 5,
          price: 1150,
        },
      ],
      taxRate: 0.1,
    } as ImportReceipt);

  const subtotal = data.items.reduce((s, it) => s + it.qty * it.price, 0);
  const tax = subtotal * data.taxRate;
  const total = subtotal + tax;

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111318] dark:text-white min-h-screen">
      <div className="px-4 md:px-8 lg:px-10 py-6 max-w-[1200px] mx-auto flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={onBack}
            className="text-[#616f89] dark:text-gray-400 text-sm font-medium hover:underline"
          >
            Kho hàng
          </button>
          <span className="text-[#616f89] dark:text-gray-400 text-sm">/</span>
          <span className="text-[#616f89] dark:text-gray-400 text-sm font-medium">
            Chứng từ
          </span>
          <span className="text-[#616f89] dark:text-gray-400 text-sm">/</span>
          <span className="text-[#111318] dark:text-white text-sm font-bold">
            Chi tiết phiếu {data.id}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              Chi tiết phiếu nhập
            </h1>
            <p className="text-[#616f89] dark:text-gray-400 text-base">
              Xem thông tin chi tiết phiếu nhập kho.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center justify-center rounded-lg h-10 px-4 border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-[#1a202c] text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-2"
              onClick={() => window.print()}
            >
              <span className="material-symbols-outlined text-lg">print</span>
              In phiếu
            </button>

            <button
              className="flex items-center justify-center rounded-lg h-10 px-4 border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-[#1a202c] text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-2"
              onClick={() => alert("Chưa nối file chứng từ gốc")}
            >
              <span className="material-symbols-outlined text-lg">
                description
              </span>
              Xem chứng từ gốc
            </button>

            <button
              className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold shadow-md hover:opacity-95 transition-colors gap-2"
              onClick={() => alert("Xuất Excel: sẽ làm ở bước API/Export")}
            >
              <span className="material-symbols-outlined text-lg">
                ios_share
              </span>
              Xuất Excel
            </button>
          </div>
        </div>

        {/* Thông tin chung */}
        <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e5e7eb] dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="border-b border-[#f0f2f4] dark:border-gray-800 px-6 py-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">info</span>
            <h3 className="text-lg font-bold">Thông Tin Chung</h3>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoField label="Số phiếu nhập" value={data.id} />
            <InfoField label="Ngày nhập" value={data.date} />
            <InfoField
              label="Nhà cung cấp"
              value={data.supplier}
              highlight
            />
            <InfoField label="Kho nhập" value={data.warehouse} />
            <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-4">
              <label className="text-sm font-semibold text-[#111318] dark:text-gray-200">
                Mã đơn đặt hàng (PO)
              </label>
              <div className="w-full h-11 flex items-center bg-white dark:bg-[#1a202c] rounded-lg border border-gray-300 dark:border-gray-700 px-3 text-sm font-medium">
                {data.po}
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách hàng */}
        <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e5e7eb] dark:border-gray-800 shadow-sm flex flex-col">
          <div className="border-b border-[#f0f2f4] dark:border-gray-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                list_alt
              </span>
              <h3 className="text-lg font-bold">Danh Sách Hàng Nhập</h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              Tổng số dòng:{" "}
              <span className="font-bold text-primary">{data.items.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 w-12">
                    #
                  </th>
                  <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 min-w-[200px]">
                    Chi tiết hàng hóa
                  </th>
                  <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 w-24">
                    ĐVT
                  </th>
                  <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 w-32 text-right">
                    SL
                  </th>
                  <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 w-32 text-right">
                    Đơn giá
                  </th>
                  <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 w-32 text-right">
                    Thành tiền
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.items.map((it, idx) => (
                  <tr
                    key={it.code}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400 align-middle">
                      {idx + 1}
                    </td>

                    <td className="py-3 px-4 align-middle">
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-semibold">
                          {it.code}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {it.desc}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 align-middle">
                      <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-center text-gray-600 dark:text-gray-300 w-fit">
                        {it.unit}
                      </div>
                    </td>

                    <td className="py-3 px-4 align-middle text-right">
                      <div className="text-sm font-medium">{it.qty}</div>
                    </td>

                    <td className="py-3 px-4 align-middle text-right">
                      <div className="text-sm font-medium">
                        {money(it.price)}
                      </div>
                    </td>

                    <td className="py-3 px-4 align-middle text-right">
                      <span className="font-bold text-sm">
                        {money(it.qty * it.price)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note + Totals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-[#1a202c] rounded-xl border border-[#e5e7eb] dark:border-gray-800 shadow-sm p-6">
            <label className="text-sm font-semibold text-[#111318] dark:text-gray-200 mb-2 block">
              Ghi chú / Nhận xét
            </label>
            <div className="w-full rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm p-4 border border-gray-200 dark:border-gray-700 min-h-[128px]">
              {data.note}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e5e7eb] dark:border-gray-800 shadow-sm p-6 flex flex-col justify-center">
            <div className="flex flex-col gap-4">
              <Row label="Tạm tính" value={money(subtotal)} />
              <Row label={`Thuế (${Math.round(data.taxRate * 100)}%)`} value={money(tax)} />
              <div className="h-px bg-gray-200 dark:bg-gray-700 w-full my-1" />
              <div className="flex justify-between items-center">
                <span className="text-base font-bold">Tổng cộng</span>
                <span className="text-2xl font-black text-primary">
                  {money(total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}

function InfoField({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#111318] dark:text-gray-200">
        {label}
      </label>
      <div
        className={[
          "w-full h-11 flex items-center rounded-lg border px-3 text-sm",
          "bg-white dark:bg-[#1a202c] border-gray-300 dark:border-gray-700",
          highlight ? "font-bold text-primary" : "font-medium",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
      <span>{label}</span>
      <span className="font-medium text-[#111318] dark:text-white">{value}</span>
    </div>
  );
}
