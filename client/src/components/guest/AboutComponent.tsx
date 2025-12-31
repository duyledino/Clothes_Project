import React from "react";
import { assets } from "@/assets/frontend_assets/assets";

const AboutComponent = () => {
  return (
    <div className="container mx-auto py-12 md:px-0 px-3">
      <div className="w-full">
        <div className="flex justify-center items-center gap-4 w-full mb-14">
          <h2 className="text-xl font-semibold text-gray-500 rounded-full">
            VỀ <span className="text-black">CHÚNG TÔI</span>
          </h2>
          <p className="w-9 h-0.5 rounded-full bg-black"></p>
        </div>
        <div className="w-full flex md:flex-row flex-col gap-10 md:items-center">
          <div className="flex-1">
            <img
              src={assets.about_img}
              alt="aboutUs"
              className="rounded-[14px]"
            />
          </div>
          <div className="md:flex-2 w-full text-[14px]">
            <p className="text-gray-700 mb-4">
              Forever ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa
              cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt
              đầu từ một ý tưởng đơn giản: cung cấp một nền tảng nơi khách hàng
              có thể dễ dàng khám phá, tìm hiểu và mua sắm đa dạng các sản phẩm
              ngay tại nhà.
            </p>
            <p className="text-gray-700 mb-4">
              Kể từ khi thành lập, chúng tôi đã làm việc không ngừng nghỉ để
              tuyển chọn những sản phẩm chất lượng cao, đa dạng phục vụ mọi sở
              thích và nhu cầu. Từ thời trang và làm đẹp đến đồ điện tử và đồ
              dùng gia đình, chúng tôi cung cấp một bộ sưu tập phong phú từ các
              thương hiệu và nhà cung cấp đáng tin cậy.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Sứ Mệnh Của Chúng Tôi
            </h3>
            <p className="text-gray-700">
              Sứ mệnh của chúng tôi tại Forever là trao quyền cho khách hàng với
              sự lựa chọn, tiện lợi và tự tin. Chúng tôi tận tâm mang đến trải
              nghiệm mua sắm liền mạch vượt mong đợi, từ khâu duyệt web, đặt
              hàng đến giao hàng và hơn thế nữa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
