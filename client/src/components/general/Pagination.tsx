import React, { type SetStateAction } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  page,
  //   currentCategories,
  setPage,
  total_page,
}: {
  //   currentCategories: string[] | null;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  total_page: number;
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const windowSize = 2;
    console.log("total page: ", total_page);

    // always show first page
    if (page > 1 + windowSize) {
      pages.push(1, "...");
    } else {
      for (let i = 1; i < page; i++) pages.push(i);
    }

    // middle window
    for (
      let i = Math.max(1, page <= 3 ? page : page - windowSize);
      i <= Math.min(total_page, page + windowSize);
      i++
    ) {
      pages.push(i);
    }

    // always show last page
    if (page < total_page - windowSize) {
      pages.push("...", total_page);
    } else {
      for (let i = page + 1; i <= total_page - windowSize; i++) pages.push(i);
    }

    return pages;
  };
  const handlePrevious = () => {
    setPage((prev) => {
      if (prev === 1) return total_page;
      return prev - 1;
    });
  };
  const handleNext = () => {
    setPage((prev) => {
      if (prev === total_page) return 1;
      return prev + 1;
    });
  };
  return (
    <div className="my-7 p-4 flex justify-center items-center gap-4">
      {/* Pagination */}
      <Button
        onClick={() => handlePrevious()}
        variant={"ghost"}
        className="bg-gray-900 text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold w-10 h-10 rounded border-2 border-gray-900 cursor-pointer"
      >
        <ChevronLeft />
      </Button>
      <div className="flex gap-4">
        {getPageNumbers().map((item, index) =>
          item === "..." ? (
            <p className="text-gray-900">...</p>
          ) : (
            <Button
              variant={"ghost"}
              key={index}
              onClick={() => setPage(item as number)}
              className={`w-10 h-10 rounded text-2xl cursor-pointer ${
                Number(item) === page ? "bg-gray-900 text-white" : "bg-gray-200"
              }`}
            >
              {item}
            </Button>
          )
        )}
      </div>
      <Button
        onClick={() => handleNext()}
        variant={"ghost"}
        className="bg-gray-900 text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold w-10 h-10 rounded border-2 border-gray-900 cursor-pointer"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
