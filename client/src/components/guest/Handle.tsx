import { assets } from "@/assets/frontend_assets/assets.js";
import { Link } from "react-router-dom";

import MobileNav from "./MobileNav";
import { setShow } from "@/slice/SearchBarSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { getStore } from "@/slice/StoreSlice";
import type { cartItem, Product } from "@/type/types.frontend";
import { logout } from "@/slice/AuthSlice";

const NavLink = [
  {
    logo: assets.search_icon,
  },
  {
    logo: assets.profile_icon,
    link: "Profile",
  },
  {
    logo: assets.cart_icon,
    link: "/Cart",
  },
  {
    logo: assets.logout_icon,
    link: "Logout",
  }
];
// type Product = {
//   id: string;
//   price: number;
//   imageUrl: string[];
//   title: string;
//   size: string;
// };

const Handle = ({ carts }: { carts: cartItem[] }) => {
  // Since I only have 1 object has property link is undefined so just useDispatch and navigate to Collection page
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state=>state.AuthSlice);
  // const { localStore } = useAppSelector((state) => state.StoreSlice);
  const router = useNavigate();
  const handleClick = (link: string | undefined) => {
    console.log("link: ", link);
    dispatch(getStore("user"));
    if (link === undefined) {
      dispatch(setShow(true));
      router("/Collection");
    } else {
      if (!user) {
        router("/Login");
        return;
      }
      if(link === "Logout"){
        dispatch(logout())
        router("/");
        return;
      }
      router("/Profile");
    }
  };
  return (
    <nav className="h-full flex justify-center items-center">
      <ul className="flex gap-6 items-center">
        {NavLink.map((item, index) => {
          if (item.link === undefined)
            return (
              <li className="" key={index}>
                <div
                  onClick={() => handleClick(item.link)}
                  className="cursor-pointer"
                >
                  <img src={item.logo} alt="util" className="w-5 h-auto" />
                </div>
              </li>
            );
          else if (item.link === "Profile") {
            return (
              <li className="" key={index}>
                <div
                  onClick={() => handleClick(item.link)}
                  className="cursor-pointer"
                >
                  <img src={item.logo} alt="util" className="w-5 h-auto" />
                </div>
              </li>
            );
          }else if(item.link === "Logout"){
            return (
              <li className="sm:block hidden" key={index}>
                <div
                  onClick={() => handleClick(item.link)}
                  className="cursor-pointer "
                >
                  <img src={item.logo} alt="util" className="w-6 h-auto" />
                </div>
              </li>
            );
          }
          return (
            <li className="relative" key={index}>
              {carts !== undefined && carts.length > 0 ? (
                <div className="flex justify-center items-center bg-black text-white w-4 h-4 rounded-[50%] absolute -top-2 -right-2 text-[12px]">
                  {carts.reduce((prev, curr) => prev + curr.quantity, 0)}
                </div>
              ) : (
                ""
              )}
              <Link to={item.link}>
                <img src={item.logo} alt="util" className="w-5 h-auto" />
              </Link>
            </li>
          );
        })}
        <MobileNav />
      </ul>
    </nav>
  );
};

export default Handle;
