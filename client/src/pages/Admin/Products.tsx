import React, { useEffect, useState } from "react";
import { products } from "@/assets/frontend_assets/assets";
import { Button } from "@/components/ui/button";

import { Plus, RotateCcw, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import Pagination from "@/components/guest/Pagination";
import Loading from "@/components/ui/Loading";
import {
  fetchDeleteProduct,
  fetchProductFromApiAdmin,
  fetchReviseProduct,
} from "@/slice/ProductSlice";
import { useNavigate } from "react-router-dom";

const tags = [
  "image",
  "name",
  "size",
  "màu sắc",
  "category",
  "price",
  "sold",
  "action",
];

const Products = () => {
  const [page, setPage] = useState(1);
  const { loading, ProductsAdmin, error, Message } = useAppSelector(
    (state) => state.ProductSlice
  );
  const router = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Products Admin: ", ProductsAdmin);
    dispatch(fetchProductFromApiAdmin({ page }));
  }, [page]);
  const handleClickDel = async (id: string) => {
    const ids: string[] = [];
    ids.push(id);
    const { type } = await dispatch(fetchDeleteProduct({ ids: ids }));
    if (type.search("reject") == -1) {
      dispatch(fetchProductFromApiAdmin({ page }));
    }
  };
  const handleClickRevise = async (id: string) => {
    const ids: string[] = [];
    ids.push(id);
    const { type } = await dispatch(fetchReviseProduct({ ids: ids }));
    if (type.search("reject") == -1) {
      dispatch(fetchProductFromApiAdmin({ page }));
    }
  };
  console.log("products: ", ProductsAdmin);
  return (
    <>
      {loading && <Loading />}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="mb-3 text-gray-900 font-bold text-3xl">Sản phẩm</h1>
          <Button
            variant={"ghost"}
            onClick={() => {
              router("addProduct");
            }}
            className="flex items-center gap-2 bg-[#135bec] hover:bg-[#135bec]/90 text-primary-foreground px-4 py-2 rounded-[--radius] hover:opacity-90 transition-all text-sm font-medium shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Sản Phẩm
          </Button>
        </div>
        <ul className="flex flex-col gap-3">
          <li className="list-none md:grid hidden grid-cols-[64px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] md:gap-x-3 md:place-items-center bg-gray-100 p-2 ">
            {tags.map((item, index) => (
              <p key={index} className="capitalize text-gray-900">
                {item}
              </p>
            ))}
          </li>
          {ProductsAdmin.map((item, index) => (
            <li
              key={item.product_id}
              className={`p-2 list-none grid md:grid-cols-[64px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] md:gap-x-3 grid-cols-2 md:place-items-center md:gap-0 gap-2 ${
                item.status === "suspend" ? "bg-red-200" : ""
              }`}
            >
              <img
                src={item.imageUrl[0]}
                alt={item.imageUrl[0]}
                width={390}
                height={450}
                className="w-16 h-auto"
              />
              <p className="text-gray-500 md:text-sm text-[12px] md:text-center">
                {item.product_name}
              </p>
              <div className="text-gray-500 md:text-sm text-[12px]">
                <p>{item.product_size.map((item) => item.size_id).join(",")}</p>
              </div>
              <div className="flex gap-1">
                {item.product_color.map((item) => (
                  <span
                    key={item.color_id + item.product_id}
                    className="inline-block w-3.5 h-3.5"
                    style={{ backgroundColor: `${item.color_id}` }}
                  ></span>
                ))}
              </div>
              <p className="text-gray-500 md:text-sm text-[12px]">
                {item.category.category_name}
              </p>
              <p className="text-gray-500 md:text-sm text-[12px]">
                {item.price.toLocaleString("vi-VN") + " VND"}
              </p>
              <p className="text-gray-500 md:text-sm text-[12px]">
                {item.count}
              </p>
              <Button
                onClick={() =>
                  item.status === "suspend"
                    ? handleClickRevise(item.product_id)
                    : handleClickDel(item.product_id)
                }
                variant={"ghost"}
                className="bg-gray-100 text-gray-600 hover:text-red-600 focus:outline-none md:col-span-1 col-span-2 cursor-pointer md:w-fit w-full"
              >
                {item.status === "suspend" ? (
                  <RotateCcw className="w-6 h-6" />
                ) : (
                  <Trash className="w-6 h-6" />
                )}
              </Button>
            </li>
          ))}
        </ul>
        {/* cause infinite render because treat [] as reference not content so prevCategory !== Category */}
        <Pagination
          pageName="product"
          currentCategories={null}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default Products;
