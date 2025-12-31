
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Package, User, Calendar, MapPin } from 'lucide-react';
import type { StockReceipt } from '../../type/types.frontend';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchGetStockReceiptByReceiptId } from '@/slice/InventorySlice';
import Loading from '@/components/ui/Loading';

const StockReceiptDetail: React.FC = () => {
  const { receipt_id } = useParams<{ receipt_id: string }>();
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const {stockReceiptDetail,loadingInventory} = useAppSelector(state=>state.InventorySlice);
  useEffect(() => {
    if(receipt_id){
      dispatch(fetchGetStockReceiptByReceiptId(receipt_id));
    }
  }, [receipt_id]);
  console.log("receipt_id: ",receipt_id);
  console.log("stockReceiptDetail: ",stockReceiptDetail);
  return (
    <>
    {loadingInventory && <Loading/>}

    <div className="min-h-screen bg-background-light dark:bg-background-dark p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router(-1)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white flex items-center gap-3">
              Chi tiết phiếu nhập
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-bold">
                {stockReceiptDetail?.receipt_id}
              </span>
            </h1>
            <p className="text-gray-500 mt-1">Xem thông tin chi tiết các mặt hàng đã nhập</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
          <Printer className="h-4 w-4" />
          <span>In phiếu</span>
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Provider Info */}
        <div className="bg-white dark:bg-[#1a202c] p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Package className="h-6 w-6" />
            <h3 className="font-bold text-lg">Nhà cung cấp</h3>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-xl">{stockReceiptDetail?.provider.provider_name}</p>
            <p className="text-sm text-gray-500">ID: {stockReceiptDetail?.provider.provider_id}</p>
          </div>
        </div>

        {/* User Info */}
         <div className="bg-white dark:bg-[#1a202c] p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-blue-500">
            <User className="h-6 w-6" />
            <h3 className="font-bold text-lg">Người nhập</h3>
          </div>
          <div className="space-y-1">
            <p className="font-medium">{stockReceiptDetail?.user.name}</p>
            <p className="text-sm text-gray-500">{stockReceiptDetail?.user.user_id}</p>
          </div>
        </div>

        {/* General Info */}
        <div className="bg-white dark:bg-[#1a202c] p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-green-500">
            <Calendar className="h-6 w-6" />
            <h3 className="font-bold text-lg">Thông tin chung</h3>
          </div>
           <div className="space-y-2">
            <div className="flex justify-between">
                <span className="text-gray-500">Ngày nhập:</span>
                <span className="font-medium">
                    {stockReceiptDetail?.create_at.toLocaleString('vi-VN', {
                      timeZone: 'Asia/Ho_Chi_Minh',
                    }).replace('T', ' ').replace('Z', '')}
                </span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500">Tổng số lượng:</span>
                <span className="font-bold text-lg text-primary">{stockReceiptDetail?.total_quantity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Table */}
      <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
            <h2 className="font-bold text-xl">Danh sách sản phẩm</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <tr className="text-left text-gray-500 font-medium text-sm">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Sản phẩm</th>
                 <th className="px-6 py-4">Mã kho</th>
                <th colSpan={3} className="px-6 py-4 text-right">Số lượng nhập</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stockReceiptDetail?.stock_receipt_details.map((item, index) => (
                <tr key={item.inventory_id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{item.product_name},
                      {item.size_id}, <span style={{backgroundColor: item.color_id}} className='inline-block w-3.5 h-3.5'></span>
                    </div>
                    <div className="text-xs text-gray-500">ID: {item.product_id}</div>
                  </td>
                   <td className="px-6 py-4 text-gray-500 text-sm">
                    {item.inventory_id}
                  </td>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                    {item.quantity} đơn vị
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Footer Row for Total */}
            <tfoot className="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
                <tr>
                    <td colSpan={5} className="px-6 py-4 text-right font-black uppercase text-gray-600 dark:text-gray-400">Tổng cộng</td>
                    <td className="px-6 py-4 text-right font-black text-xl text-primary">
                        {stockReceiptDetail?.stock_receipt_details.reduce((sum, item) => sum + item.quantity, 0)} đơn vị
                    </td>
                </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default StockReceiptDetail;
