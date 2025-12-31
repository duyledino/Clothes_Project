import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import {
  fetchApiAddToCart,
  fetchApiCart,
  refeshAddToCart,
} from "@/slice/CartSlice";
import Loading from "../ui/Loading";
import type { cartItem, InventoryInCartUser, Product_Color, Product_Size } from "@/type/types.frontend";

interface Item {
  cartItem: cartItem;
  InventoryInCartUser: InventoryInCartUser[];
  handleChange: (
    value: string | null, // the value to store update in cart
    product_id: string,
    image: string[],
    product_name: string,
    price: number,
    quantity: number,
    active: boolean,
    product_size: Product_Size | null,
    product_color: Product_Color | null
  ) => void;
  handleDelete: (product_id: string, size_id: string,color_id:string) => void;
}

const CartIem = ({ cartItem, InventoryInCartUser, handleChange, handleDelete }: Item) => {
  const { loading } = useAppSelector((state) => state.CartSlice);
  const [quan, setQuan] = useState<string | number>(cartItem.quantity);
  const [click, setClick] = useState<boolean>(cartItem.active);
  const [activate, setActivate] = useState<boolean | null>(null);
  console.log("cartItem in cartIem : ", cartItem);
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      console.log("trigger in quan, activate");
      if (typeof quan === "string" || activate !== null) {
        console.log("click: ", click);
        console.log("activate: ", activate);
        handleChange(
          String(quan),
          cartItem.product.product_id,
          cartItem.product.imageUrl,
          cartItem.product.product_name,
          cartItem.product.price,
          Number(quan),
          activate as boolean,
          cartItem.product_size,
          cartItem.product_color
        );
        setQuan((prev) => Number(prev));
        setActivate(null);
      }
    }, 800); // 0.8s debounce
    return () => clearTimeout(timeOutID);
  }, [quan, activate]);
  return (
    <>
      <div className={`flex items-center gap-2`}>
        <div
          className={`w-5 h-5 ring-1 hover:cursor-pointer border-none ${
            click ? "bg-green-300" : "bg-transparent"
          }`}
          onClick={() => {
            setClick((prev) => {
              const newValue = !prev;
              setActivate(newValue); // keep activate in sync
              return newValue;
            });
          }}
        ></div>
        <div
          key={cartItem.product.product_id}
          className={`flex sm:flex-nowrap flex-wrap sm:gap-0 gap-y-3.5 flex-1 items-center py-4 border-b border-gray-200  `}
        >
          <img
            src={cartItem.product.imageUrl[0]}
            alt={cartItem.product.product_name + "-" + cartItem.product.product_color?.color_id + "-"+cartItem.product.product_size?.size_id}
            width={390}
            height={450}
            className="w-20 h-auto object-cover mr-4"
          />
          <div className="flex-grow max-w-xl">
            <h3 className="md:text-lg sm:text-[14px] text-xs font-medium">
              {cartItem.product.product_name}
            </h3>
            <div className="flex items-center">
              <span className="text-gray-700">{cartItem.product.price.toLocaleString()}</span>
              <span className="ml-2 px-2 py-1 text-xs border border-gray-400 bg-gray-100">
                {cartItem.product_size?.size_id}
              </span>
              <span style={{
                backgroundColor : cartItem.product_color?.color_id
              }} className="ml-2 h-7 w-8 text-xs border border-gray-400 bg-gray-100">
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between flex-1">
            <Input
              onChange={(e) =>{
                    if(InventoryInCartUser){
                      const inventory = InventoryInCartUser.find((item) => item.product_id === cartItem.product.product_id 
                      && item.size_id === cartItem.product_size?.size_id 
                      && item.color_id === cartItem.product_color?.color_id);
                      if(inventory && inventory.quantity < Number(e.target.value)){
                        toast.error(`Số lượng trong của ${cartItem.product.product_name}
                                   ${cartItem.product_size?.size_id} ${cartItem.product_color?.color_id}
                                    không đủ. SL tồn: ${inventory.quantity}`);
                        return;
                      }
                    }
                setQuan((prev) => {
                  prev = e.target.value;
                  setActivate(click);
                  return prev;
                })
              }
              }
              type="number"
              value={quan}
              disabled={loading}
              min={1}
              className="md:w-36 w-16 px-2 py-1 text-center border border-gray-300 rounded"
            />
            <p className="text-black">{(cartItem.product.price * cartItem.quantity).toLocaleString()}</p>
            <button
              className="ml-4 text-gray-600 hover:text-red-600 focus:outline-none cursor-pointer"
              onClick={() => handleDelete(cartItem.product.product_id,cartItem.product_size?.size_id!,cartItem.product_color?.color_id!)}
            >
              <Trash className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartIem;
