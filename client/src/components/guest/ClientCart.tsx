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

// NOTE:  const {user,loading} = useAppSelector(state=>state.AuthSlice);  is checked in ProtectRouteUser so here I will force it to accept the variable

const ClientCart = ({ carts }: { carts: cartItem[] }) => {
  // const { carts } = useAppSelector((state) => state.CartSlice);
  // console.log("carts in page cart: ", carts);
  const { user } = useAppSelector((state) => state.AuthSlice);
  const [localStore, setLocalStore] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStore(localStorage.getItem("user"));
    }
  }, []);
  const { Message, error, loading } = useAppSelector(
    (state) => state.CartSlice
  );
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
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    // const { token, id } = JSON.parse(localStore);
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
  // useEffect(() => {
  //   if (Message && !error) {
  //     if (localStore === undefined || localStore === null) {
  //       toast.error("No token");
  //       return;
  //     }
  //     const { token, id } = JSON.parse(localStore);
  //     console.log("token, id: ", token, id);
  //     toast.success(Message);
  //     dispatch(refeshAddToCart());
  //     dispatch(fetchApiCart(user?.user.user_id!));
  //   }
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [Message, error, localStore]);
  // const cartItems = [
  //   {
  //     id: 1,
  //     name: "Men Round Neck Pure Cotton T-shirt",
  //     price: 64,
  //     size: "XXL",
  //     quantity: 7,
  //     image: img1, // Replace with actual image path
  //   },
  //   {
  //     id: 2,
  //     name: "Women Zip-Front Relaxed Fit Jacket",
  //     price: 74,
  //     size: "L",
  //     quantity: 14,
  //     image: img2, // Replace with actual image path
  //   },
  // ];
  const handleDelete = async (product_id: string, size_id: string,color_id:string) => {
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    // const { token, id } = JSON.parse(localStore);
    const { type } = await dispatch(
      fetchApiDeleteACart({
        user_id: user!.user.user_id!,
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
      <h2 className="text-2xl font-semibold mb-5">YOUR CART</h2>
      {carts.map((item) => (
        <CartIem
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
