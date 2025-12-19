import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  fetchApiAddToCart,
  fetchApiCart,
  refeshAddToCart,
} from "@/slice/CartSlice";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";
import type { Product_Color, Product_Size, ProductData_Cart } from "@/type/types.frontend";
import { useNavigate } from "react-router-dom";

const AddToCart = ({
  product,
  price,
}: {
  product: ProductData_Cart;
  price: number;
}) => {
  const { carts, error, loading, Message } = useAppSelector(
    (state) => state.CartSlice
  );
  const router = useNavigate();
  const { user } = useAppSelector((state) => state.AuthSlice);
  console.log("carts: ", carts);
  const dispatch = useAppDispatch();
  const handleAddToCart = async () => {
    if (product.product_size === null || product.product_color === null) {
      toast.error("Vui lòng chọn size và màu");
      return;
    }
    const item = carts.find(
      (item) =>
        item.product.product_id === product.product_id &&
        item.product_size?.size_id === product.product_size?.size_id &&
        item.product_color?.color_id === product.product_color?.color_id
    );
    console.log("item in add to cart: ", item);
    let objectItem: {
      product: ProductData_Cart;
      quantity: number;
      subtotal: number;
      active: boolean;
      product_size: Product_Size | null;
      product_color:Product_Color |null
    } = {
      product: {
        product_id: "",
        product_name: "",
        price: 0,
        imageUrl: [],
        product_size: null,
        product_color: null
      },
      quantity: 0,
      subtotal: 0,
      active: false,
      product_size: null,
      product_color:null
    };
    if (item) {
      objectItem["product"] = item.product;
      objectItem["quantity"] = item.quantity + 1;
      objectItem["subtotal"] = item.subtotal + item.product.price;
      objectItem["active"] = item.active;
      objectItem["product_size"] = item.product_size;
      objectItem["product_color"] = item.product_color
    } else {
      objectItem["product"] = product;
      objectItem["quantity"] = 1;
      objectItem["subtotal"] = price;
      objectItem["active"] = true;
      objectItem["product_size"] = product.product_size;
      objectItem["product_color"] = product.product_color;
    }
    console.log("user: ",user);
    if (!user) {
      toast.error("Cần đăng nhập để thực hiện thao tác này");
      router("/login");
      return;
    }
    const { type } = await dispatch(
      fetchApiAddToCart({ cartItem: objectItem, user_id: user?.user.user_id! })
    );
    if (type.search("reject") == -1) {
      console.log("user?user: ",user?.user.user_id);
      dispatch(refeshAddToCart());
      dispatch(fetchApiCart(user?.user.user_id!));
    }
  };
  // useEffect(() => {
  //   if (Message && !error) {
  //     if (!user) {
  //       toast.error("No token");
  //       return;
  //     }
  //     toast.success(Message);
  //   }
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [Message, error]);
  return (
    <>
      {loading && <Loading />}
      <Button
        disabled={loading}
        onClick={handleAddToCart}
        variant={"ghost"}
        className="bg-gray-900 w-fit text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
      >
        Add to cart
      </Button>
    </>
  );
};

export default AddToCart;
