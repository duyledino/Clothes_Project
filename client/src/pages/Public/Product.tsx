import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { products, assets } from "@/assets/frontend_assets/assets";
import Guarantee from "@/components/guest/Guarantee";
import AddToCart from "@/components/guest/AddToCart";
import ProductDesAndReview from "@/components/guest/ProductDesAndReview";
import RelatedProduct from "@/components/guest/RelatedProduct";
import ProductInfo from "@/components/guest/ProductInfo";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetProductById } from "@/slice/ProductSlice";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";
import { fetchReviewsByProductId } from "@/slice/ReviewSlice";

const ProductDetail = () => {
  // TODO: fetch product by id
  const { Product, loading, error } = useAppSelector(
    (state) => state.ProductSlice
  );
  const { Reviews, errorReview, loadingReview } = useAppSelector(
    (state) => state.ReviewSlice
  );
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
    if (id !== undefined) {
      dispatch(fetchGetProductById(id));
      dispatch(fetchReviewsByProductId(id));
    }
  }, []);
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   } else if (errorReview) {
  //     toast.error(errorReview);
  //   }
  // }, [error, errorReview]);
  console.log("Reviews: ", Reviews);
  console.log("loading, loadingReview: ", loading, loadingReview);
  console.log("product", Product);
  console.log("inventories: ", Product?.inventories);
  return (
    <>
      {loading || (loadingReview && <Loading />)}
      <div className="container mx-auto pt-14 md:px-0 px-3">
        <ProductInfo
          Reviews={Reviews}
          tryon={Product?.tryon}
          description={Product?.description}
          product_id={Product?.product_id}
          imageUrl={Product?.imageUrl}
          price={Product?.price}
          product_name={Product?.product_name}
          product_size={Product?.product_size}
          product_color={Product?.product_color}
          inventories={Product?.inventories!}
        />
        <ProductDesAndReview
          product_id={Product?.product_id || ""}
          description={
            Product?.description || "No description for this product"
          }
          reviews={Reviews}
        />
        <RelatedProduct />
      </div>
    </>
  );
};

export default ProductDetail;
