import React, { useEffect, useState } from "react";
import CartIem from "./CartIem";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import {
  fetchApiAddToCart,
  fetchApiCart,
  fetchApiDeleteACart,
  refeshAddToCart,
} from "@/slice/CartSlice";
import Loading from "../ui/Loading";
import type {
  cartItem,
  Product,
  Product_Color,
  Product_Size,
  ProductData_Cart,
} from "@/type/types.frontend";
import { fetchGetInventoryFollowingCart } from "@/slice/InventorySlice";
import { useNavigate } from "react-router-dom";

// NOTE:  const {user,loading} = useAppSelector(state=>state.AuthSlice);  is checked in ProtectRouteUser so here I will force it to accept the variable

const ClientCart = ({ carts }: { carts: cartItem[] }) => {
  // const { carts } = useAppSelector((state) => state.CartSlice);
  // console.log("carts in page cart: ", carts);
  const router = useNavigate();
  const { user } = useAppSelector((state) => state.AuthSlice);
  const { InventoriesCartUser } = useAppSelector((state) => state.InventorySlice);
  const [localStore, setLocalStore] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStore(localStorage.getItem("user"));
    }
    dispatch(fetchGetInventoryFollowingCart(user?.user.user_id!));
  }, []);
  const { Message, error, loading } = useAppSelector(
    (state) => state.CartSlice
  );
  // thay đổi số lượng sản phẩm trong cart
  const handleChange = async (
    value: string | null,
    product_id: string,
    image: string[],
    product_name: string,
    price: number,
    quantity: number,
    active: boolean,
    product_size: Product_Size | null,
    product_color: Product_Color | null
  ) => {
    console.log("change");
    console.log("active in client cart: ", active);
    if (!user || !user.user) {
      toast.error("Hãy đăng nhập để thực hiện thao tác này");
      router("/login");
      return;
    }

    const user_id: string = user?.user.user_id!;
    const Product: ProductData_Cart = {
      product_id: product_id,
      imageUrl: image,
      price: price,
      product_name: product_name,
      product_size: product_size,
      product_color: product_color
    };
    const {type} = await dispatch(
      fetchApiAddToCart({
        cartItem: {
          product: Product,
          quantity: Number(value),
          subtotal: price * quantity,
          active: active,
          product_size: product_size,
          product_color: product_color,
        },
        user_id: user_id,
      })
    );
    if(type.search("reject")==-1){
      console.log("fetch api cart again: ");
      dispatch(fetchApiCart(user?.user.user_id!));
    }
  };
  const handleDelete = async (product_id: string, size_id: string,color_id:string) => {
    if (!user || !user.user) {
      toast.error("Hãy đăng nhập để thực hiện thao tác này");
      router("/login");
      return;
    }
    // const { token, id } = JSON.parse(localStore);
    const { type } = await dispatch(
      fetchApiDeleteACart({
        user_id: user.user.user_id!,
        product_id: product_id,
        size_id: size_id,
        color_id: color_id 
      })
    );
    if(type.search("reject")==-1){
      console.log("fetch api cart again: ");
      dispatch(fetchApiCart(user?.user.user_id!));
    }
  };
  console.log("carts in page cart: ", carts);
  return (
    <div>
      {loading && <Loading />}
      <h2 className="text-2xl font-semibold mb-5">Giỏ hàng của bạn</h2>
      {carts.map((item) => (
        <CartIem
        InventoryInCartUser={InventoriesCartUser}
        key={item.product_color!.color_id+item.product_size!.size_id+item.product.product_id}
        cartItem={{
          active: item.active,
          product: item.product,
          product_color: item.product_color,
          product_size: item.product_size,
          quantity: item.quantity,
          subtotal: item.subtotal
        }}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ClientCart;
