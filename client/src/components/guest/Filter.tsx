import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ChevronRight } from "lucide-react";
import { Label } from "../ui/label";
import Loading from "../ui/Loading";
import type { CategoryOrigin } from "@/type/types.frontend";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetAllCategory } from "@/slice/CategorySlice";

type setCateAndType = {
  setCurrentCategories: Dispatch<SetStateAction<string[]>>;
};

const Filter = ({ setCurrentCategories }: setCateAndType) => {
  const [show, setShow] = useState<boolean | undefined>(true);
  const [width, setWidth] = useState<number | undefined>(0);
  const dispatch = useAppDispatch();
  const { loadingCategory, categories } = useAppSelector(
    (state) => state.CategorySlice
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWith = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWith);
      return () => window.removeEventListener("resize", handleWith);
    }
  }, []);
  useEffect(() => {
    dispatch(fetchGetAllCategory());
  }, []);
  const cateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setCurrentCategories((prev) => {
      if (prev.find((item) => item === e.target.value))
        return prev.filter((item) => item !== e.target.value);
      else return [...prev, e.target.value];
    });
  };
  return (
    <>
      {loadingCategory ? <Loading /> : ""}
      <div className="md:w-72 w-full flex flex-col gap-3">
        <div
          className={`flex w-fit md:cursor-default cursor-pointer`}
          onClick={
            width !== undefined && width < 768
              ? () => setShow((prev) => !prev)
              : undefined
          }
        >
          <h1 className={`uppercase text-foreground font-bold`}>filters</h1>
          <ChevronRight
            className={`${
              show ? "rotate-90" : ""
            } md:hidden block transition-all`}
          />
        </div>
        <div
          className={`w-full flex-col gap-3 ${
            width !== undefined && width < 768
              ? show
                ? "flex"
                : "hidden"
              : "flex"
          }`}
        >
          <div className="flex flex-col p-3 gap-1 border-2">
            <h1 className="uppercase text-foreground font-bold text-[14px]">
              categories
            </h1>
            {categories !== null &&
            categories !== undefined &&
            categories.length > 0
              ? categories!.map((item, index) => (
                  <div className="flex gap-1.5 items-center" key={index}>
                    <Input
                      onChange={cateChange}
                      id={item.category_id}
                      type="checkbox"
                      className="w-fit"
                      value={item.category_id}
                      key={item.category_id}
                    />
                    <Label htmlFor={item.category_id}>
                      {item.category_name}
                    </Label>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
