import { assets } from "@/assets/frontend_assets/assets";
import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import Guarantee from "./Guarantee";
import SkeletonProductInfo from "./SkeletonProductInfo";
import TryOnButton from "./TryOnButton";
import type {
  Product_Color,
  Product_Review,
  Product_Size,
  Review,
} from "@/type/types.frontend";

const ProductInfo = ({
  product_id,
  product_name,
  imageUrl,
  description,
  price,
  product_size,
  product_color,
  tryon,
  Reviews,
  inventories,
}: Product_Review) => {
  console.log("Reviews: ", Reviews);
  if (
    inventories === undefined ||
    product_color === undefined ||
    product_id === undefined ||
    product_name === undefined ||
    description === undefined ||
    price === undefined ||
    imageUrl === undefined ||
    product_size === undefined ||
    tryon === undefined
  ) {
    return <SkeletonProductInfo />;
  }
  const [sizeProduct, setSizeProduct] = useState<Product_Size | null>(null);
  const [colorProduct, setColorProduct] = useState<Product_Color | null>(null);
  const [lockColorId, setLockColorId] = useState<string[]>([]);
  const [lockSizeId, setLockSizeId] = useState<string[]>([]);
  const image = imageUrl[0];
  const stars = Array.from(
    {
      length: Math.floor(
        Reviews.length === 0
          ? 0
          : Reviews.reduce((pre, curr) => pre + curr.score, 0) / Reviews.length
      ),
    },
    (v, i) => i
  );
  console.log("product id: ", product_id);
  console.log(
    "product_id, title, imageUrl, description, price,tryon: ",
    product_id,
    product_name,
    product_color,
    imageUrl,
    description,
    price,
    product_size,
    tryon,
    inventories,
  );
  useEffect(() => {
    if (sizeProduct !== null) {
      const outOfStockColors =
        inventories
          ?.filter(
            (item) =>
              item.quantity === 0 && item.size_id === sizeProduct.size_id
          )
          .map((item) => item.color_id) ?? [];
      setLockColorId(outOfStockColors);

      if (colorProduct && outOfStockColors.includes(colorProduct.color_id)) {
        setColorProduct(null);
      }
    } else {
      setLockColorId([]);
    }

    if (colorProduct !== null) {
      const outOfStockSizes =
        inventories
          ?.filter(
            (item) =>
              item.quantity === 0 && item.color_id === colorProduct.color_id
          )
          .map((item) => item.size_id) ?? [];
      setLockSizeId(outOfStockSizes);

      if (sizeProduct && outOfStockSizes.includes(sizeProduct.size_id)) {
        setSizeProduct(null);
      }
    } else {
      setLockSizeId([]);
    }
  }, [sizeProduct, colorProduct, inventories]);

  console.log("lockColorId: ", lockColorId);
  console.log("lockSizeId: ", lockSizeId);
  return (
    <>
      <div className="w-full flex md:flex-row flex-col md:px-0 px-3 gap-8">
        <div className="flex-1 flex sm:flex-row flex-col-reverse sm:items-start items-center gap-3">
          <div className="flex sm:min-h-full sm:flex-col flex-row flex-wrap gap-3.5 w-auto">
            {imageUrl.map((item, index) => (
              <img
                src={item}
                alt="product image"
                key={index}
                width={390}
                height={450}
                className="w-24 h-auto"
              />
            ))}
          </div>
          <div className="md:w-md w-[320px]">
            {image && (
              <img
                width={390}
                height={450}
                src={image}
                alt="product main"
                className="w-full h-full aspect-auto"
              />
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-black font-bold text-xl">{product_name}</h1>
          <div className="flex items-center gap-8">
            <div className="flex gap-2.5 items-center">
              {stars.map((item, index) => {
                return (
                  <img
                    src={assets.star_icon}
                    alt="star"
                    key={index}
                    className="w-5"
                  />
                );
              })}
              {Array.from({ length: 5 - stars.length }, (v, i) => i).map(
                (item, index) => (
                  <img
                    src={assets.star_dull_icon}
                    alt="star_dull"
                    key={index}
                    className="w-5"
                  />
                )
              )}
            </div>
            <p>({Reviews.length})</p>
          </div>
          <h1 className="text-black font-bold text-2xl">{price}</h1>
          <p className="text-gray-500 text-[14px] font-semibold">
            {description}
          </p>
          <div className="flex flex-col gap-3">
            <p>Select size</p>
            {/* // TODO: add size and review product  */}
            <div className="flex gap-3">
              {product_size.map((item, index) => (
                <div
                  key={item.size_id}
                  className={`bg-gray-300 flex justify-center items-center text-foreground py-3 px-5 text-[16px] transition-all cursor-pointer ${
                    lockSizeId.find((i) => i == item.size_id) !== undefined
                      ? `ring-1 ring-black text-gray-100 cursor-not-allowed`
                      : sizeProduct?.size_id === item.size_id
                      ? "ring-1 ring-orange-300"
                      : ""
                  }`}
                  onClick={() => {
                    lockSizeId.find((i) => i == item.size_id) === undefined
                      ? setSizeProduct((prev) =>
                          // this is assign to prev
                          // first click to get and the second will skip
                          prev === item ? null : (prev = item)
                        )
                      : "";
                  }}
                >
                  {item.size_id}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Select màu</p>
            {/* // TODO: add size and review product  */}
            <div className="flex gap-3">
              {product_color.map((item, index) => (
                <div
                  key={item.color_id}
                  className={`p-1 flex justify-center items-center ${
                    lockColorId.find((i) => i == item.color_id) !== undefined
                      ? `bg-black cursor-no-drop`
                      : item.color_id === colorProduct?.color_id
                      ? "bg-orange-300"
                      : ""
                  } w-14 h-14`}
                >
                  <div
                    style={{ backgroundColor: item.color_id }}
                    className={`flex justify-center items-center text-foreground w-full h-full transition-all cursor-pointer`}
                    onClick={() =>
                      lockColorId.find((i) => i == item.color_id) === undefined
                        ? setColorProduct((prev) =>
                            // this is assign to prev
                            // first click to get and the second will skip
                            prev === item ? null : (prev = item)
                          )
                        : ""
                    }
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4">
            <AddToCart
              price={price}
              product={{
                product_id,
                imageUrl,
                price,
                product_name,
                product_size: sizeProduct,
                product_color: colorProduct,
              }}
              inventories={inventories}
            />
            <TryOnButton tryon={tryon} />
          </div>
          <Guarantee />
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
