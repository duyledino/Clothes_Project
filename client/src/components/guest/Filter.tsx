import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ChevronRight } from "lucide-react";
import { Label } from "../ui/label";
import Loading from "../ui/Loading";

type setCateAndType = {
  setCategories: Dispatch<SetStateAction<string[]>>;
};

const categoryData = [
  { id: "Men", name: "Men" },
  { id: "Women", name: "Women" },
  { id: "Kids", name: "Kids" },
];

const typeData = [
  { id: "Topwear", name: "Topwear" },
  { id: "Bottomwear", name: "Bottomwear" },
  { id: "Winterwear", name: "Winterwear" },
];

const Filter = ({ setCategories }: setCateAndType) => {
  const [category, setCategory] = useState<{ id: string; name: string }[]>([]);
  const [type, setType] = useState<{ id: string; name: string }[]>([]);
  const [show, setShow] = useState<boolean | undefined>(true);
  const [width, setWidth] = useState<number | undefined>(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWith = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWith);
      return () => window.removeEventListener("resize", handleWith);
    }
  }, []);
  useEffect(() => {
    console.log("categoryData,typeData: ", categoryData, typeData);
    setCategory((prev) => (prev = categoryData));
    setType((prev) => (prev = typeData));
  }, []);
  const cateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setCategories((prev) => {
      if (prev.find((item) => item === e.target.value))
        return prev.filter((item) => item !== e.target.value);
      else return [...prev, e.target.value];
    });
  };
  console.log("category,type: ", category, type);
  return (
    <>
      {!category || !type ? <Loading /> : ""}
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
            {category !== null && category !== undefined
              ? category!.map((item, index) => (
                  <div className="flex gap-1.5 items-center" key={index}>
                    <Input
                      onChange={cateChange}
                      id={item.id}
                      type="checkbox"
                      className="w-fit"
                      value={item.id}
                      key={item.id}
                    />
                    <Label htmlFor={item.id}>{item.name}</Label>
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
