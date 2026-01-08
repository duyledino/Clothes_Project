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
              onClick={() => router(`${item.product_id}`)}
              key={item.product_id}
              className={`
                p-4 cursor-pointer list-none 
                md:grid md:grid-cols-[64px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] md:gap-x-3 md:items-center
                flex flex-col gap-3 border rounded-lg shadow-sm bg-white mb-2 md:mb-0 md:border-none md:shadow-none md:rounded-none
                ${item.status === "suspend" ? "bg-red-50" : ""}
              `}
            >
              {/* Image & Name Section for Mobile */}
              <div className="flex items-center gap-4 md:contents">
                <img
                  src={item.imageUrl[0]}
                  alt={item.imageUrl[0]}
                  width={390}
                  height={450}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div className="md:contents">
                   <p className="font-medium text-gray-900 md:text-sm md:text-center line-clamp-2 md:line-clamp-none">
                    {item.product_name}
                  </p>
                  {/* Shows ID or extra info on mobile if needed, hidden on desktop if grid handles it */}
                </div>
              </div>

              {/* Mobile details grid */}
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 md:contents">
                 <div className="md:contents">
                    <span className="md:hidden font-medium text-gray-700">Size: </span>
                    <span>{item.product_size.map((item) => item.size_id).join(", ")}</span>
                 </div>

                 <div className="md:contents">
                     <span className="md:hidden font-medium text-gray-700 block mb-1">Color: </span>
                     <div className="flex gap-1 items-center h-full">
                      {item.product_color.map((item) => (
                        <span
                          key={item.color_id + item.product_id}
                          className="inline-block w-4 h-4 rounded-full border"
                          style={{ backgroundColor: `${item.color_id}` }}
                        ></span>
                      ))}
                    </div>
                 </div>

                 <div className="md:contents">
                    <span className="md:hidden font-medium text-gray-700">Category: </span>
                    <span>{item.product_category.map((item) => item.category_name).join(", ")}</span>
                 </div>

                 <div className="md:contents">
                    <span className="md:hidden font-medium text-gray-700">Price: </span>
                    <span className="font-semibold text-gray-900 md:text-gray-500 md:font-normal">
                      {item.price.toLocaleString("vi-VN") + " VND"}
                    </span>
                 </div>

                 <div className="md:contents">
                    <span className="md:hidden font-medium text-gray-700">Sold: </span>
                    <span>{item.count}</span>
                 </div>
              </div>

              {/* Actions */}
              <div className="mt-2 md:mt-0 flex justify-end md:block">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    item.status === "suspend"
                      ? handleClickRevise(item.product_id)
                      : handleClickDel(item.product_id);
                  }}
                  variant={"ghost"}
                  size="icon"
                  className="bg-gray-100 text-gray-600 hover:text-red-600 hover:bg-red-50 focus:outline-none"
                >
                  {item.status === "suspend" ? (
                    <RotateCcw className="w-5 h-5" />
                  ) : (
                    <Trash className="w-5 h-5" />
                  )}
                </Button>
              </div>
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
