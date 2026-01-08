import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetProductByIdAdmin } from "@/slice/ProductSlice";
import Loading from "@/components/ui/Loading";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { product_id } = useParams();
  const dispatch = useAppDispatch();
  const { Product, loading } = useAppSelector((state) => state.ProductSlice);
  const router = useNavigate();
  useEffect(() => {
    if (product_id) {
      dispatch(fetchGetProductByIdAdmin(product_id));
    }
  }, [dispatch, product_id]);

  if (loading) return <Loading />;
  if (!Product) return <div>Product not found</div>;

  return (
    <div className="p-4 bg-gray-100/40 rounded-md mx-auto my-6">
      <div className="flex justify-between items-center mb-4">
        <Button 
                  onClick={() => router(-1)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button
            variant={"ghost"}
            onClick={() => {
              router("/Admin/Products/UpdateProduct/"+product_id);
            }}
            className="flex items-center gap-2 bg-[#135bec] hover:bg-[#135bec]/90 text-primary-foreground px-4 py-2 rounded-[--radius] hover:opacity-90 transition-all text-sm font-medium shadow-sm"
          >
            <Pencil  className="w-4 h-4" />
            Sửa Sản Phẩm
          </Button>
      </div>
       <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="font-semibold text-lg">Product Name:</Label>
          <div className="mb-4">{Product.product_name}</div>

          <Label className="font-semibold text-lg">Product ID:</Label>
          <div className="mb-4">{Product.product_id}</div>

          <Label className="font-semibold text-lg">Price:</Label>
          <div className="mb-4">{Number(Product.price).toLocaleString()} VND</div>

          <Label className="font-semibold text-lg">Description:</Label>
          <div className="mb-4 whitespace-pre-wrap">{Product.description}</div>

           <Label className="font-semibold text-lg">Categories:</Label>
          <div className="mb-4 flex flex-wrap gap-2">
            {Product.product_category?.map((cat: any) => (
              <span key={cat.category_id} className="bg-gray-200 px-2 py-1 rounded">
                {cat.category_name}
              </span>
            ))}
          </div>

          <Label className="font-semibold text-lg">Sizes:</Label>
           <div className="mb-4 flex flex-wrap gap-2">
            {(Product.product_size as any[])?.map((size: any) => (
                 <span key={size.size_id} className="bg-gray-200 px-2 py-1 rounded">
                  {typeof size === 'string' ? size : size.size_id} 
                  {/* Depends on how backend returns, likely just IDs or objects based on getProductByIdAdmin */}
                </span>
            ))}
           </div>

          <Label className="font-semibold text-lg">Colors:</Label>
           <div className="mb-4 flex flex-wrap gap-2">
              {(Product.product_color as any[])?.map((color: any) => (
                  <div key={color.color_id} style={{backgroundColor: color.color_id}} className="w-6 h-6 rounded-full border border-gray-300" title={color.color_id}></div>
              ))}
           </div>
        </div>

        <div>
           <Label className="font-semibold text-lg">Images:</Label>
           <div className="mb-4 flex flex-wrap gap-2">
            {Product.imageUrl?.map((url, index) => (
              <img key={index} src={url} alt={`Product ${index}`} className="w-[200px] h-auto object-cover rounded" />
            ))}
           </div>
           <Label className="font-semibold text-lg">Try-on Image:</Label>
           <div className="mb-4">
            {Product.tryon && (
              <>
                <div className="w-[200px] h-auto">
                    <img src={Product.tryon} alt="Tryon" className="w-full h-auto object-cover rounded" />
                </div>
                </>
            )}
            </div>            
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
