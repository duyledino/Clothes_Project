import { useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  FolderTree,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Loading from "@/components/ui/Loading";
import {
  fetchDeleteACategory,
  fetchGetAllCategoryAdmin,
} from "@/slice/CategorySlice";
import type { CategoryOrigin } from "@/type/types.frontend";
import { toast } from "react-toastify";
import UpdateCategoryModal from "@/components/admin/UpdateCategoryModal";
import { fetchUpdateACategory } from "@/slice/CategorySlice";
import { useState } from "react";

const Categories = () => {
    const router = useNavigate();
    const dispatch = useAppDispatch();
    const { loadingCategory, categories } = useAppSelector(
      (state) => state.CategorySlice
    );
    const [selectedCategory, setSelectedCategory] = useState<CategoryOrigin | null>(
      null
    );
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  
    const onUpdate = async (category_id: string, category_name: string) => {
      if (!category_id || !category_name) {
        toast.error("Thiếu thông tin cập nhật");
        return;
      }
      const { type } = await dispatch(
        fetchUpdateACategory({
          category_id,
          category_name,
        })
      );
      if (type.search("reject") == -1) {
        dispatch(fetchGetAllCategoryAdmin());
        setIsOpenUpdateModal(false);
      }
    };
  
    useEffect(() => {
      if (selectedCategory != null) {
        setIsOpenUpdateModal(true);
      }
    }, [selectedCategory]);
  useEffect(() => {
    dispatch(fetchGetAllCategoryAdmin());
  }, []);
  const handleDelete = async (item: CategoryOrigin) => {
    if (!item || item.category_id === "") {
      toast.error("Không tìm thấy mã phân loại");
      return;
    }
    const { type } = await dispatch(
      fetchDeleteACategory({
        category_id: item.category_id,
      })
    );
    if (type.search("reject") == -1) {
      dispatch(fetchGetAllCategoryAdmin());
    }
  };
  console.log("categories: ", categories);
  return (
    <>
      <UpdateCategoryModal
        isOpen={isOpenUpdateModal}
        onClose={() => setIsOpenUpdateModal(false)}
        categoryItem={selectedCategory}
        onUpdate={onUpdate}
      />
      {loadingCategory && <Loading />}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Categories
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage product groupings and taxonomy.
            </p>
          </div>
          <button
            onClick={() => {
              router("addCategory");
            }}
            className="flex items-center gap-2 bg-[#135bec] hover:bg-[#135bec]/90 text-primary-foreground px-4 py-2 rounded-[--radius] hover:opacity-90 transition-all text-sm font-medium shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Thêm phân loại
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full bg-background border border-input rounded-[--radius] pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>

        <div className="rounded-[--radius] border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-6 py-4">Tên phân loại</th>
                <th className="px-6 py-4">Mã phân loại</th>
                <th className="px-6 py-4 text-center">Linked SP</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories &&
                categories.length > 0 &&
                categories.map((item) => (
                  <tr
                    key={item.category_id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary rounded-lg">
                          <FolderTree className="w-4 h-4 text-secondary-foreground" />
                        </div>
                        <span className="font-medium text-foreground">
                          {item.category_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                      {item.category_id}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                        {item.link_total} SP
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                         onClick={()=>{
                          setSelectedCategory(item);
                         }}
                        className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(item);
                          }}
                          className="p-2 hover:bg-destructive/10 rounded-md text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Categories;
