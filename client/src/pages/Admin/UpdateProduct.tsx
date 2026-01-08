import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { assets } from "@/assets/admin_assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";
import { fetchGetProductByIdAdmin, resetStateProduct, fetchUpdateProduct } from "@/slice/ProductSlice";
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
import { fetchGetAllCategory } from "@/slice/CategorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { createProductSchema, updateProductSchema } from "@/schema/authProduct";

type ImageURL = {
  url: string;
  file: File | null;
};

function UpdateProduct() {
  const { product_id } = useParams();
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, Product } = useAppSelector(
    (state) => state.ProductSlice
  );
  const { sizes } = useAppSelector((state) => state.SizeSlice);
  const { colors } = useAppSelector((state) => state.ColorSlice);
  const { categories } = useAppSelector((state) => state.CategorySlice);
  const [files, setFiles] = useState<File[]>([]);
  // const [tryOnFile, setTryOnFile] = useState<File | null>(null);
  const [tryon, setTryon] = useState<ImageURL | null>(null);
  const [tryonURL, setTryonURL] = useState<string >("");
  const [currentSize, setCurrentSize] = useState<SizeOrigin[]>([]);
  const [currentColor, setCurrentColor] = useState<ColorOrigin[]>([]);
  const [currentCategory, setCurrentCategory] = useState<CategoryOrigin[]>([]);
  const [images, setImages] = useState<ImageURL[]>([]);
  const [price, setPrice] = useState<number>(0);
  
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

    useEffect(() => {
        dispatch(fetchGetAllSize());
        dispatch(fetchGetAllColor());
        dispatch(fetchGetAllCategory());
        if (product_id) {
            dispatch(fetchGetProductByIdAdmin(product_id));
        }
    }, [dispatch, product_id]);

    useEffect(() => {
        if (Product && Product.product_id === product_id) {
            setProductName(Product.product_name);
            setDescription(Product.description);
            setPrice(Number(Product.price));
            
            if (Product.product_category) {

                 setCurrentCategory(Product.product_category as any as CategoryOrigin[]);
            }

        
            if (Product.product_size) {
                 const mappedSizes = (Product.product_size as any[]).map(s => {
                    const fullSize = sizes.find(sz => sz.size_id === s.size_id);
                    return fullSize || { size_id: s.size_id, size_name: s.size_id }; 
                 });
                 setCurrentSize(mappedSizes as any);
            }

             if (Product.product_color) {
                 const mappedColors = (Product.product_color as any[]).map(c => {
                    const fullColor = colors.find(cl => cl.color_id === c.color_id);
                    return fullColor || { color_id: c.color_id, color_name: c.color_id }; 
                 });
                 setCurrentColor(mappedColors as any);
            }

            if (Product.imageUrl) {
                setImages(Product.imageUrl.map(url => ({ url, file: null })));
            }
            if (Product.tryon) {
                setTryon({ url: Product.tryon, file: null });
                setTryonURL(Product.tryon);
            }
            // setFiles(Product.photos.map(photo => photo));
        }
    }, [Product, sizes, colors]); 

    const handleClick = async () => {
      if (price === undefined) {
        toast.error("Giá không được để trống");
        return;
      }

      console.log("category: ",currentCategory);
      console.log("size: ",currentSize);
      console.log("color: ",currentColor);
      console.log("images: ",images);
      console.log("productName: ",productName);
      console.log("description: ",description);
      console.log("price: ",price);
      console.log("tryon: ",tryon);
      console.log("files: ",files);
      const check = updateProductSchema.safeParse({
        images: images.map(item=>item.url),
        productName: productName,
        description: description,
        price: price,
        size: currentSize,
        color: currentColor,
        category: currentCategory,
      });
      console.log("check: ",check);
      if (!check.success) {
        const firstIssue = check.error.issues[0];
        toast.error(firstIssue.message);
      } else {
        const formData = new FormData();
        files.forEach((item) => formData.append("photos", item));
        formData.append("image", images.map(item=>item.url).join(","));
        formData.append("product_name", productName);
        console.log("productName: ",productName);
        formData.append("description", description);
        formData.append("price", price?.toString());
        formData.append("category", currentCategory.map((item) => item.category_id).join(","));
        formData.append("tryonURL", tryonURL);
        formData.append("tryon", tryon ? tryon.file : null as any);
        formData.append(
          "size",
          currentSize.map((item) => item.size_id).join(",")
        );
        formData.append(
          "color",
          currentColor.map((item) => item.color_id).join(",")
        );
        formData.append("photos", files ? files : null as any);
        console.log("formData: ", formData); // {}
        const { type } = await dispatch(
          fetchUpdateProduct({ product_id: product_id!,productData: formData })
        );
        if (type.search("reject") == -1) {
          router("/Admin/Products/"+product_id);
        }
      }
    };
  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (!filesList || filesList.length === 0) {
      toast.error("No file selected");
      return;
    }
    if (!filesList[0].type.includes("image/")) {
      toast.error("No image selected");
      return;
    }
    const imageURL = URL.createObjectURL(filesList[0]);
    setImages((prev) => [...prev, { url: imageURL, file: filesList[0] }]);
    setFiles((prev) => [...prev, filesList[0]]);
  };

  const handleChangeTryon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (!filesList || filesList.length === 0) {
      toast.error("No file selected");
      return;
    }
    if (!filesList[0].type.includes("image/")) {
      toast.error("No image selected");
      return;
    }
    const imageURL = URL.createObjectURL(filesList[0]);
    setTryon({ url: imageURL, file: filesList[0] });
  };

  const handleDelete = (url: string) => {
    console.log("url: ",url);
    const needDel = images.find((item) => item.url === url);
    if (!needDel) return;
    setImages((prev) => prev.filter((item) => item.url !== url));
    if (needDel.file) {
        setFiles((prev) => prev.filter((item) => item !== needDel.file));
    }
  };

  const handleDeleteTryon = (url: string) => {
    setTryon(null);
    setTryonURL("");
  };

  return (
    <>
      {loading && <Loading />}
        <h1 className="text-2xl font-bold mb-4">Update Product (ID: {product_id})</h1>
      <div className="flex flex-col gap-3">
        {/* Same UI Structure as AddProduct */}
        <div className="mb-3">
          <h1 className="mb-3 text-gray-900 text-[14px] font-semibold">
            Upload Image
          </h1>
          <div className="flex flex-row md:flex-nowrap flex-wrap md:justify-normal justify-around gap-3">
            {images.map((item, index) => (
                  <div key={index}
                    className={`relative md:w-24 md:h-24 w-20 h-20 hover:ring transition-all`}
                  >
                    <Label
                      htmlFor={`image${index}`}
                      className="h-full w-full"
                    >
                      <img
                        src={item.url}
                        alt="upload"
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
            {/* Limit to 4 images if needed, or more? AddProduct had limit 4 logic? */}
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
            <Label htmlFor="productCategory" className="text-gray-900">
              Loại sản phẩm
            </Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {categories.map((item, index) => (
              <button
                className={`${
                  currentCategory.find((i) => i.category_id === item.category_id) !==
                  undefined
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-200 text-gray-900"
                } w-10 h-10 cursor-pointer`}
                key={item.category_id}
                onClick={() => {
                  setCurrentCategory((prev) => {
                    if (
                      prev.find((i) => i.category_id === item.category_id) !== undefined
                    )
                      return prev.filter((i) => i.category_id !== item.category_id);
                    return [...prev, item];
                  });
                }}
              >
                {item.category_name}
              </button>
            ))}
            </div>
          </div>
        <div className="mb-3">
          <Label className="text-gray-900">Size</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {[...sizes].sort((a, b) => a.size_name.toLocaleLowerCase().localeCompare(b.size_name.toLocaleLowerCase())).map((item, index) => (
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
          UPDATE
        </Button>
      </div>
    </>
  );
}

export default UpdateProduct;
