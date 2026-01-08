import {
  Barcode,
  ChartNoAxesCombined,
  CirclePlus,
  Handshake,
  Lock,
  MessageCircleMore,
  PackageSearch,
  PaintRoller,
  ReceiptText,
  Ruler,
  Shapes,
  User,
  UserRoundCheck,
  Warehouse,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
const nav = [
  {
    link: "/Admin",
    name: "Dashboard",
    logo: (className: string) => <ChartNoAxesCombined className={className} />,
  },
  {
    link: "/Admin/Inventory",
    name: "Kho",
    logo: (className: string) => <Warehouse className={className} />,
  },
  {
    link: "/Admin/Receipt",
    name: "Phiếu nhập kho",
    logo: (className: string) => <ReceiptText className={className} />,
  },
  {
    link: "/Admin/Products",
    name: "Products",
    logo: (className: string) => <Barcode className={className} />,
  },
  {
    link: "/Admin/Orders",
    name: "Orders",
    logo: (className: string) => <PackageSearch className={className} />,
  },
  {
    link: "/Admin/User",
    name: "User",
    logo: (className: string) => <User className={className} />,
  },
  {
    link: "/Admin/Category",
    name: "Loại sản phẩm",
    logo: (className: string) => <Shapes className={className} />,
  },
  {
    link: "/Admin/Color",
    name: "Màu Sắc",
    logo: (className: string) => <PaintRoller className={className} />,
  },
  {
    link: "/Admin/Size",
    name: "Size",
    logo: (className: string) => <Ruler className={className} />,
  },
  {
    link: "/Admin/Role",
    name: "Quyền hạn",
    logo: (className: string) => <UserRoundCheck className={className} />,
  },
  {
    link: "/Admin/Provider",
    name: "Nhà cung cấp",
    logo: (className: string) => <Handshake  className={className} />,
  },
  {
    link: "/Admin/Chat",
    name: "Chat",
    logo: (className: string) => <MessageCircleMore className={className} />,
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div 
        className={`
          z-[101]
            fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out border-r-2 pt-4 pl-9
            md:relative md:translate-x-0 cursor-pointer 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
    >
      <div className="w-full flex flex-col gap-3">
        {nav.map((item) => (
          <Link to={item.link} key={item.link} onClick={() => setSidebarOpen(false)}>
            <div
              className={`flex items-center gap-7 p-2 transition-all hover:ring-2 hover:ring-gray-900 border-1 ${
                pathname === item.link ? "bg-gray-900" : ""
              }`}
            >
              {item.logo(
                `${pathname === item.link ? "text-white" : "text-black"}`
              )}
              <h1
                className={`block ${
                  pathname === item.link ? "text-white" : "text-black"
                }`}
              >
                {item.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
