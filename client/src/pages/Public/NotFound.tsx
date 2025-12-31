import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-gray-100 dark:text-gray-800 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest animate-pulse">
            Oops!
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Không tìm thấy trang
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-[15px] leading-relaxed">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc hiện
        không khả dụng.
      </p>

      <Link to="/">
        <Button className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <Home className="w-5 h-5 mr-2" />
          Về Trang Chủ
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
