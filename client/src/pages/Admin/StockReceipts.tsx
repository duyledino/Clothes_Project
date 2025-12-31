import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Search, Filter } from 'lucide-react';
import type { StockReceipt } from '../../type/types.frontend';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchGetAllStockReceipt } from '@/slice/InventorySlice';
import Loading from '@/components/ui/Loading';

const StockReceipts: React.FC = () => {
  const router = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();
  const [page,setPage] = useState(1);
  const {stockReceipts,loadingInventory,total_stock_page}= useAppSelector(state=>state.InventorySlice);
  const handleRowClick = (id: string) => {
    router(`${id}`); // Relative navigation, assumes route is setup correctly
  };

  useEffect(()=>{
    dispatch(fetchGetAllStockReceipt(page));
  },[page])

  

  return (
    <>
    {loadingInventory && <Loading/>}
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white">Lịch sử nhập kho</h1>
          <p className="text-gray-500">Quản lý và theo dõi các phiếu nhập hàng</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-[#1a202c] rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm mã phiếu, nhà cung cấp..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
          <Filter className="h-4 w-4" />
          <span>Bộ lọc</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <tr className="text-left text-gray-500 font-medium text-sm uppercase tracking-wider">
                <th className="px-6 py-4">Mã phiếu</th>
                <th className="px-6 py-4">Nhà cung cấp</th>
                <th className="px-6 py-4">Người nhập</th>
                <th className="px-6 py-4">Ngày nhập</th>
                <th className="px-6 py-4 text-center">Tổng SL</th>
                <th className="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stockReceipts.map((receipt) => (
                <tr 
                  key={receipt.receipt_id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                  onClick={() => handleRowClick(receipt.receipt_id)}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {receipt.receipt_id}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {receipt.provider.provider_name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    <div className="flex flex-col">
                      <span className="font-medium">{receipt.user.name}</span>
                      <span className="text-xs text-gray-400">{receipt.user.user_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {new Date(receipt.create_at).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                    {receipt.total_quantity}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-primary"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {stockReceipts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Không tìm thấy phiếu nhập nào.
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default StockReceipts;
