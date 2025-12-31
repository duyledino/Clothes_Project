import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { assets } from "@/assets/frontend_assets/assets";

import {
  createReview,
  deleteReview,
  fetchReviewsByProductId,
  resetStateReview,
  updateReview,
} from "@/slice/ReviewSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import { ReceiptRussianRuble, Trash } from "lucide-react";
import { Button } from "../ui/button";
import Loading from "../ui/Loading";
import type { Review } from "@/type/types.frontend";

const ProductDesAndReview = ({
  description,
  reviews,
  product_id,
}: {
  product_id: string;
  description: string;
  reviews: Review[];
}) => {
  if (product_id === "") {
    return;
  }
  const { errorReview, loadingReview } = useAppSelector(
    (state) => state.ReviewSlice
  );
  const {user} = useAppSelector(state=>state.AuthSlice);
  // const [localStore, setLocalStore] = useState(() => {
  //   const localStore = localStorage.getItem("user");
  //   // if (localStore === undefined || localStore === null) {
  //   //   toast.error("No token");
  //   //   return;
  //   // }
  //   // const { id, token } = JSON.parse(localStore);
  //   const object = {
  //     id: id,
  //     token: token,
  //   };
  //   return object;
  // });
  const dispatch = useAppDispatch();
  const [getValue, setGetValue] = useState<Review | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [star, setStar] = useState<number[]>([]);
  const [content, setContent] = useState<string>("");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const deleteUserReview = () => {
    if (product_id === "" || !user || user.user.user_id === "") {
      toast.error("Failed to Delete Your Review");
      return;
    }
    dispatch(
      deleteReview({
        product_id: product_id,
        user_id: user.user.user_id,
      })
    );
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content === "" || star.length === 0) {
      toast.error("Can't post your review");
      return;
    }
    console.log("content,star: ", content, star.length);
    const localStore = localStorage.getItem("user");
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const { id } = JSON.parse(localStore);
    if (
      reviews.find(
        (item) => item.product_id === getValue?.product_id && item.user_id === id
      )
    ) {
      dispatch(
        updateReview({
          content: content,
          product_id: product_id,
          score: star.length,
          user_id: id,
        })
      );
    } else {
      dispatch(
        createReview({
          content: content,
          product_id: product_id,
          score: star.length,
          user_id: id,
        })
      );
    }
    setStar([]);
    setContent("");
  };

  const clickStar = (index: number) => {
    let tempStars: number[] = [];
    for (let i = 0; i <= index; i++) {
      tempStars.push(i);
    }
    setStar((prev) => (prev = tempStars));
  };
  useEffect(() => {
    if (errorReview) {
      toast.error(errorReview);
      resetStateReview();
    }
  }, [errorReview, loadingReview, dispatch]);
  useEffect(() => {
    if (getValue && getValue.user_id === user?.user.user_id) {
      setContent(getValue.content);
      setStar(
        (prev) => (prev = Array.from({ length: getValue.score }, (v, i) => i))
      );
    }
  }, [getValue]);
  // console.log(
  //   "userid, localstore.id,user mail: ",
  //   reviews[0],
  //   localStore?.id,
  //   reviews[0].user?.email
  // );
  console.log("user: ",user);
  return (
    <>
      {loadingReview && <Loading />}
      {user ? (
        <div className="w-full border border-gray-200 rounded-md overflow-hidden my-24">
          <div className="flex border-b-2">
            <button
              className={`
            px-5 py-2 text-sm text-gray-700
            ${
              activeTab === "description"
                ? "bg-white font-semibold border-b-0"
                : "bg-gray-100 border-b border-gray-200"
            }
            focus:outline-none
          `}
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
            <button
              className={`
            px-5 py-2 text-sm text-gray-700
            ${
              activeTab === "reviews"
                ? "bg-white font-semibold border-b-0"
                : "bg-gray-100 border-b border-gray-200"
            }
            focus:outline-none
          `}
              onClick={() => handleTabClick("reviews")}
            >
              Reviews ({reviews.length})
            </button>
          </div>
          <div className="p-5">
            {activeTab === "description" && (
              <div className="tab-panel">
                {description !== undefined ||
                description !== null ||
                description !== "" ? (
                  description
                ) : (
                  <>
                    <p className="text-sm leading-relaxed text-gray-600">
                      An e-commerce website is an online platform that
                      facilitates the buying and selling of products or services
                      over the internet. It serves as a virtual marketplace
                      where businesses and individuals can showcase their
                      products, interact with customers, and conduct
                      transactions without the need for a physical presence.
                      E-commerce websites have gained immense popularity due to
                      their convenience, accessibility, and the global reach
                      they offer.
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">
                      E-commerce websites typically display products or services
                      along with detailed descriptions, images, prices, and any
                      available variations (e.g., sizes, colors). Each product
                      usually has its own dedicated page with relevant
                      information.
                    </p>
                  </>
                )}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="tab-panel">
                <div className="flex flex-col gap-1">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review.product_id}
                        className="mb-4 relative"
                        onClick={() =>
                          setGetValue((prev) => {
                            if (review.user_id !== user?.user.user_id) return null;
                            return prev !== null ? null : review;
                          })
                        }
                      >
                        <p className="text-sm font-semibold text-gray-800">
                          {review.user?.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          {review.content}
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500">Score:</span>
                          <span className="ml-1 text-sm text-gray-700">
                            {review.score}
                          </span>
                        </div>
                        {user?.user.user_id == review.user_id ? (
                          <Button
                            onClick={() => deleteUserReview()}
                            variant={"ghost"}
                            className="absolute top-0 right-0 bg-gray-100 text-gray-600 hover:text-red-600 focus:outline-none md:col-span-1 col-span-2 cursor-pointer md:w-fit w-fit"
                          >
                            <Trash className="w-6 h-6" />
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-relaxed text-gray-600">
                      No reviews yet.
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <form action="" onSubmit={handleSubmit}>
                    <div className="flex gap-2.5 mb-2">
                      {star.length > 0
                        ? [
                            ...star.map((item, index) => (
                              <img
                                src={assets.star_icon}
                                alt="star"
                                className="w-5 h-w-5 cursor-pointer"
                                onClick={() => clickStar(index)}
                              />
                            )),
                            ...Array.from(
                              { length: 5 - star.length },
                              (v, i) => i
                            ).map((_, i) => (
                              <img
                                src={assets.star_dull_icon}
                                alt="star_dulll"
                                className="w-5 h-w-5 cursor-pointer"
                                onClick={() => clickStar(star.length + i)}
                              />
                            )),
                          ]
                        : Array.from({ length: 5 }, (v, i) => i).map(
                            (item, index) => (
                              <img
                                src={assets.star_dull_icon}
                                alt="star_dulll"
                                className="w-5 h-w-5 cursor-pointer"
                                onClick={() => clickStar(index)}
                              />
                            )
                          )}
                    </div>
                    <Input
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Review this product"
                      className="w-full"
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductDesAndReview;
