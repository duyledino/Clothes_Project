import Collections from "@/components/guest/Collections";
import Filter from "@/components/guest/Filter";
import Search from "@/components/guest/Search";
import { setShow } from "@/slice/SearchBarSlice";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { motion } from "motion/react";
import Pagination from "@/components/guest/Pagination";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

const Collection = () => {
  const { show } = useAppSelector((state) => state.SearchBar);
  const { SearchProduct, loading, error } = useAppSelector(
    (state) => state.ProductSlice
  );
  const {loadingCategory,categories} = useAppSelector(state=>state.CategorySlice);
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  console.log("page in page: ", page);
  console.log("Product: ", SearchProduct);
  console.log("categories: ",categories);
  console.log("query: ",query);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      {loading && <Loading />}
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full bg-gray-300 py-8 md:px-0 px-3 ${
            show ? "block" : "hidden"
          }`}
        >
          <Search setQuery={setQuery} />
        </motion.div>
        <div className="w-full flex md:flex-row flex-col gap-6 pt-14 md:px-0 px-3">
          <Filter
            setCurrentCategories={setCurrentCategories}
          />
          <Collections
            SearchProduct={SearchProduct}
            currentCategories={currentCategories}
            query={query}
            page={page}
            setPage={setPage}
          />
        </div>
        {/* show Pagination when length of productSearch !== 0 */}
        {SearchProduct.length === 0 && (
          <Pagination
          pageName="product"
            currentCategories={currentCategories}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Collection;
