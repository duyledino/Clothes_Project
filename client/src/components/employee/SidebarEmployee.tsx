import {
  Package,
  Truck,
  CheckCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
const nav = [
  {
    link: "/Employee/DoneOrders",
    name: "Done Orders",
    logo: (className: string) => <CheckCircle className={className} />,
  },
  {
    link: "/Employee/PrepareOrders",
    name: "Prepare Orders",
    logo: (className: string) => <Package className={className} />,
  },
  {
    link: "/Employee/ShippingOrders",
    name: "Shipping Orders",
    logo: (className: string) => <Truck  className={className} />,
  },  
];

const SidebarEmployee = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="h-[90vh] md:w-2xs w-20 pt-4 pl-9 border-r-2">
      <div className="w-full flex flex-col gap-5">
        {nav.map((item) => (
          <Link to={item.link} key={item.link}>
            <div
              className={`flex items-center gap-7 p-2 transition-all hover:ring-2 hover:ring-gray-900 border-1 ${
                pathname === item.link || pathname.startsWith(item.link + "/") ? "bg-gray-900" : ""
              }`}
            >
              {item.logo(`${pathname === item.link || pathname.startsWith(item.link + "/") ? 'text-white' : 'text-black'}`)}
              <h1
                className={`md:block hidden ${
                  pathname === item.link || pathname.startsWith(item.link + "/") ? "text-white" : "text-black"
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

export default SidebarEmployee;
