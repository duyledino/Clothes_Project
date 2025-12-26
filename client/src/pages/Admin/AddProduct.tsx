import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { assets } from "@/assets/admin_assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProductSchema } from "@/schema/authProduct";
import { fetchCreateAProduct, resetStateProduct } from "@/slice/ProductSlice";
import { X } from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type {
  ColorOrigin,
  SizeOrigin,
  CategoryOrigin,
} from "@/type/types.frontend";
import { fetchGetAllSize } from "@/slice/SizeSlice";
import { fetchGetAllColor } from "@/slice/ColorSlice";
import { fetchGetACategory, fetchGetAllCategory } from "@/slice/CategorySlice";

type ImageURL = {
  url: string;
  file: File;
};

// const sizes: string[] = ["S", "M", "L", "XL", "XXL"];

function AddProduct() {
  const dispatch = useAppDispatch();
  const { error, loading, Message } = useAppSelector(
    (state) => state.ProductSlice
  );
  const { sizes } = useAppSelector((state) => state.SizeSlice);
  const { colors } = useAppSelector((state) => state.ColorSlice);
  const { categories } = useAppSelector((state) => state.CategorySlice);
  // tryon url
  const [tryon, setTryon] = useState<ImageURL | null>(null);
  const [currentSize, setCurrentSize] = useState<SizeOrigin[]>([]);
  const [currentColor, setCurrentColor] = useState<ColorOrigin[]>([]);
  const [currentCategory, setCurrentCategory] =
    useState<CategoryOrigin | null>();
  const [images, setImages] = useState<ImageURL[]>([]);
  const [price, setPrice] = useState<number>(0);
  //save file upload
  const [files, setFiles] = useState<File[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const handleClick = async () => {
    if (price === undefined) {
      toast.error("Price can not leave");
      return;
    }
    if (tryon === null) {
      toast.error("Try on image is missing");
      return;
    }
    console.log("category: ",currentCategory);
    const check = createProductSchema.safeParse({
      images: files,
      productName: productName,
      description: description,
      price: price,
      size: currentSize,
      color: currentColor,
      category: currentCategory,
    });
    if (!check.success) {
      const firstIssue = check.error.issues[0];
      toast.error(firstIssue.message);
    } else {
      const formData = new FormData();
      files.forEach((item) => formData.append("photos", item));
      formData.append("product_name", productName);
      formData.append("description", description);
      formData.append("price", price?.toString());
      formData.append("category", currentCategory!.category_id);
      formData.append(
        "size",
        currentSize.map((item) => item.size_id).join(",")
      );
      formData.append(
        "color",
        currentColor.map((item) => item.color_id).join(",")
      );
      formData.append("photos", tryon.file);
      const { type } = await dispatch(
        fetchCreateAProduct({ productCreate: formData })
      );
      if (type.search("reject") == -1) {
        setFiles([]);
        setImages([]);
        setCurrentSize([]);
        setCurrentColor([]);
        setPrice(0);
        setProductName("");
        setDescription("");
        setCurrentCategory(null);
        setTryon(null);
        dispatch(resetStateProduct());
      }
    }
  };
  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No file selected");
      return;
    }
    if (!files[0].type.includes("image/")) {
      toast.error("No image selected");
      return;
    }
    console.log("file, index: ", files[0]);
    const imageURL = URL.createObjectURL(files[0]);
    setImages((prev) => [...prev, { url: imageURL, file: files[0] }]);
    setFiles((prev) => [...prev, files[0]]);
  };
  const handleChangeTryon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No file selected");
      return;
    }
    if (!files[0].type.includes("image/")) {
      toast.error("No image selected");
      return;
    }
    console.log("file, index: ", files[0]);
    const imageURL = URL.createObjectURL(files[0]);
    setTryon((prev) => (prev = { url: imageURL, file: files[0] }));
  };
  // useEffect(() => {
  //   if (images !== undefined && images.length > 0) {
  //     setFiles((prev) => (prev = images.map((item) => item.file)));
  //   }
  // }, [images]);
  const handleDelete = (url: string) => {
    const needDel = images.find((item) => item.url === url);
    if (url === "" || needDel === null) {
      toast.error("No image selected");
      return;
    }
    setImages((prev) => prev.filter((item) => item.url !== url));
    setFiles((prev) => prev.filter((item) => item !== needDel?.file));
  };
  const handleDeleteTryon = (url: string) => {
    if (tryon === null) {
      toast.error("No image selected");
      return;
    }
    setTryon(null);
  };

  useEffect(() => {
    dispatch(fetchGetAllSize());
    dispatch(fetchGetAllColor());
    dispatch(fetchGetAllCategory());
  }, []);

  console.log(
    "currentColor,currentSize,currentCategory: ",
    currentColor,
    currentSize,
    currentCategory
  );

  useEffect(() => {
    console.log("files: ", files);
    console.log("image: ", images);
  }, [files]);

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col gap-3">
        <div className="mb-3">
          <h1 className="mb-3 text-gray-900 text-[14px] font-semibold">
            Upload Image
          </h1>
          <div className="flex flex-row md:flex-nowrap flex-wrap md:justify-normal justify-around gap-3">
            {/* {Array.from({ length: 4 }, (v, i) => i).map((item, index) => (
              //use relative to handle layout fill of IMage
              
            ))} */}
            {images.length === 0
              ? ""
              : images.map((item, index) => (
                  <div
                    className={`relative md:w-24 md:h-24 w-20 h-20 hover:ring transition-all`}
                  >
                    <Label
                      htmlFor={`image${index}`}
                      key={index}
                      className="h-full w-full"
                    >
                      <img
                        src={item.url}
                        alt="upload"
                        // width={width === undefined ? undefined : width >= 768 ? 96 : 80} // or whatever fits your layout
                        className="w-full h-full object-cover"
                      />
                    </Label>
                    <div
                      onClick={() => handleDelete(item.url)}
                      className="cursor-pointer absolute w-4 h-4 -top-2 -right-2 flex justify-center z-10 items-center rounded-[50%] bg-red-400 text-white text-sm"
                    >
                      {<X />}
                    </div>
                  </div>
                ))}
            {files.length < 4 ? (
              <div
                className={`relative md:w-24 md:h-24 w-20 h-20 hover:ring transition-all`}
              >
                <Label htmlFor={`image`}>
                  <img
                    src={assets.upload_area}
                    alt="upload"
                    className="w-full h-full"                    
                  />
                  <Input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id={`image`}
                    hidden
                    onChange={(e) => handleChangeImages(e)}
                    className="absolute z-[9]"
                  />
                </Label>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mb-3">
          <Label className="text-gray-900 mb-3">
            Try on Image (Hình sản phẩm cho thử đồ ảo)
          </Label>
          <div
            className={`relative md:w-24 md:h-24 w-20 h-20 hover:ring transition-all`}
          >
            {tryon !== null ? (
              <>
                <img
                  src={tryon.url}
                  alt="upload"
                  // width={width === undefined ? undefined : width >= 768 ? 96 : 80} // or whatever fits your layout
                  className="w-full h-full"
                />
                <div
                  onClick={() => handleDeleteTryon(tryon.url)}
                  className="cursor-pointer absolute w-4 h-4 -top-2 -right-2 flex justify-center z-10 items-center rounded-[50%] bg-red-400 text-white text-sm"
                >
                  {<X />}
                </div>
              </>
            ) : (
              <Label htmlFor={`imageTryon`}>
                <img
                  src={assets.upload_area}
                  alt="upload"
                  // width={width === undefined ? undefined : width >= 768 ? 96 : 80} // or whatever fits your layout
                />
                <Input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  id={`imageTryon`}
                  hidden
                  onChange={(e) => handleChangeTryon(e)}
                  className="absolute z-[9]"
                />
              </Label>
            )}
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="productName" className="text-gray-900">
            Tên sản phẩm
          </Label>
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            id="productName"
            placeholder="Type here"
            className="mt-1"
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="productDescription" className="text-gray-900">
            Mô tả
          </Label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="productDescription"
            placeholder="Write content here"
            className="mt-1 min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="mb-3 flex md:flex-row flex-col gap-4">
          <div>
            <Label htmlFor="productCategory" className="text-gray-900">
              Loại sản phẩm
            </Label>
            <Select
              onValueChange={(e) => {
                setCurrentCategory(categories.find((i) => i.category_id === e));
              }}
            >
              <SelectTrigger className="mt-1 w-[180px]">
                <SelectValue placeholder="Phân loại" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem
                    key={item.category_id}
                    value={`${item.category_id}`}
                  >
                    {item.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="productPrice" className="text-gray-900">
              Giá
            </Label>
            <Input
              onChange={(e) => {
                if (isNaN(Number(e.target.value)))
                  toast.error("Price must be number");
                else setPrice(Number(e.target.value));
              }}
              value={price}
              type="text"
              id="productPrice"
              placeholder="25"
              className="mt-1 w-fit"
            />
          </div>
        </div>

        <div className="mb-3">
          <Label className="text-gray-900">Size</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {sizes.map((item, index) => (
              <button
                className={`${
                  currentSize.find((i) => i.size_id === item.size_id) !==
                  undefined
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-200 text-gray-900"
                } w-10 h-10 cursor-pointer`}
                key={item.size_id}
                onClick={() => {
                  setCurrentSize((prev) => {
                    if (
                      prev.find((i) => i.size_id === item.size_id) !== undefined
                    )
                      return prev.filter((i) => i.size_id !== item.size_id);
                    return [...prev, item];
                  });
                }}
              >
                {item.size_name}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-3 ">
          <Label className="text-gray-900">Màu sắc</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {colors.map((item, index) => (
              <div key={item.color_id} className="relative">
                <div
                  className={`absolute 
                    ${
                      currentColor.find((i) => i.color_id === item.color_id) !==
                      undefined
                        ? "block"
                        : "hidden"
                    }
                    left-0 -bottom-0.5 w-full h-1 bg-black`}
                ></div>
                <button
                  style={{ backgroundColor: item.color_id }}
                  className={`w-10 h-10 cursor-pointer`}
                  onClick={() => {
                    setCurrentColor((prev) => {
                      if (
                        prev.find((i) => i.color_id === item.color_id) !==
                        undefined
                      )
                        return prev.filter((i) => i.color_id !== item.color_id);
                      return [...prev, item];
                    });
                  }}
                ></button>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={handleClick}
          variant={"ghost"}
          className="bg-gray-900 md:w-fit w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
        >
          ADD
        </Button>
      </div>
    </>
  );
}

export default AddProduct;
