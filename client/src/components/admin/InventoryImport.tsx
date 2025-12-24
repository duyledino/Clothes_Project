"use client";

export default function InventoryImport() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black">Phiếu Nhập Hàng Mới</h1>
          <p className="text-gray-500">Tạo phiếu nhập kho mới</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 h-10 border rounded-lg font-bold">
            Lưu nháp
          </button>
          <button className="px-6 h-10 bg-primary text-white rounded-lg font-bold">
            Hoàn tất phiếu
          </button>
        </div>
      </div>

      {/* Thông tin chung */}
      <div className="bg-white dark:bg-[#1a202c] rounded-xl p-6 mb-6">
        <h2 className="font-bold mb-4">Thông tin chung</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input disabled value="#RV-2023-001"
            className="input bg-gray-100 cursor-not-allowed" />

          <input type="date" className="input" />

          <select className="input">
            <option>Chọn nhà cung cấp</option>
            <option>Acme</option>
          </select>

          <select className="input">
            <option>Kho chính</option>
          </select>
        </div>
      </div>

      {/* Danh sách hàng */}
      <div className="bg-white dark:bg-[#1a202c] rounded-xl p-6">
        <h2 className="font-bold mb-4">Danh sách hàng nhập</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th>#</th>
              <th>Hàng hóa</th>
              <th>SL</th>
              <th>Đơn giá</th>
              <th className="text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td>1</td>
              <td>iPhone 14 Pro</td>
              <td>
                <input type="number" defaultValue={10} className="input w-20" />
              </td>
              <td>
                <input type="number" defaultValue={999} className="input w-24" />
              </td>
              <td className="text-right font-bold">$9,990</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
