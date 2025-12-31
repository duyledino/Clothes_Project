import React from "react";

const WhyChoose = () => {
  return (
    <div className="bg-white py-12 md:px-0 px-3">
      <div className="container mx-auto">
        <div className="flex justify-start items-center gap-4 w-full mb-14">
          <h2 className="text-xl uppercase font-semibold text-gray-500 rounded-full">
            TẠI SAO <span className="text-black">CHỌN CHÚNG TÔI</span>
          </h2>
          <p className="w-9 h-0.5 rounded-full bg-black"></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-2 gap-0.5 bg-gray-300">
          <div className="text-start p-12 py-24 bg-white">
            <h3 className="text-[14px] text-gray-900 font-bold mb-4">
              Đảm Bảo Chất Lượng:
            </h3>
            <p className="text-gray-700 text-[14px]">
              Chúng tôi tỉ mỉ lựa chọn và kiểm tra từng sản phẩm để đảm bảo đáp
              ứng các tiêu chuẩn chất lượng nghiêm ngặt của mình.
            </p>
          </div>
          <div className="text-start p-12 py-24 bg-white">
            <h3 className="text-[14px] text-gray-900 font-bold mb-4">
              Tiện Lợi:
            </h3>
            <p className="text-gray-700 text-[14px]">
              Với giao diện thân thiện và quy trình đặt hàng đơn giản, việc mua
              sắm chưa bao giờ dễ dàng hơn thế.
            </p>
          </div>
          <div className="text-start p-12 py-24 bg-white">
            <h3 className="text-[14px] text-gray-900 font-bold mb-4">
              Dịch Vụ Khách Hàng Xuất Sắc:
            </h3>
            <p className="text-gray-700 text-[14px]">
              Đội ngũ chuyên nghiệp tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn,
              đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
