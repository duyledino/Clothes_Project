import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Loading from "@/components/ui/Loading";
import { fetchDeleteASize, fetchGetAllSize } from "@/slice/SizeSlice";
import type { SizeOrigin } from "@/type/types.frontend";
import { toast } from "react-toastify";
import UpdateSizeModal from "@/components/admin/UpdateSizeModal";
import { fetchUpdatedSize } from "@/slice/SizeSlice";

export default function Size() {
  const [query, setQuery] = useState("");
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { loadingSize, sizes } = useAppSelector((state) => state.SizeSlice);
  
  const [selectedSize, setSelectedSize] = useState<SizeOrigin | null>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

  const onUpdate = async (size_id: string, size_name: string) => {
    if (!size_id || !size_name) {
      toast.error("Thiếu thông tin cập nhật");
      return;
    }
    const { type } = await dispatch(
      fetchUpdatedSize({
        size_id,
        size_name,
      })
    );
    if (type.search("reject") == -1) {
      dispatch(fetchGetAllSize());
      setIsOpenUpdateModal(false);
    }
  };

  useEffect(() => {
    if (selectedSize != null) {
      setIsOpenUpdateModal(true);
    }
  }, [selectedSize]);
  useEffect(() => {
    dispatch(fetchGetAllSize());
  }, []);
  const handleDelete = async (item: SizeOrigin) => {
    if (!item || item.size_id === "") {
      return toast.error("Không tìm thấy mã size");
    }
    const { type } = await dispatch(
      fetchDeleteASize({ size_id: item.size_id })
    );
    if (type.search("reject") == -1) {
      dispatch(fetchGetAllSize());
    }
  };

  return (
    <>
      <UpdateSizeModal
        isOpen={isOpenUpdateModal}
        onClose={() => setIsOpenUpdateModal(false)}
        sizeItem={selectedSize}
        onUpdate={onUpdate}
      />
      {loadingSize && <Loading />}
      <div className="flex h-[calc(100vh-0px)] w-full overflow-hidden bg-[#f6f6f8] text-slate-900">
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col gap-4 flex-shrink-0 z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Size Management
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Manage product sizes available in the system.
                </p>
              </div>
              <button
                onClick={() => {
                  router("AddSize");
                }}
                className="bg-[#135bec] hover:bg-[#135bec]/90 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus size={20} strokeWidth={2.5} />
                Add New Size
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-2">
              {/* Search */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search size={18} />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-slate-100 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#135bec] text-sm"
                  placeholder="Search by size name..."
                  type="text"
                />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto bg-slate-50 p-6">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-24">
                        ID
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                        Size Name
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-24 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {[...sizes]
                      .sort((a, b) =>
                        a.size_name
                          .toLowerCase()
                          .localeCompare(b.size_name.toLowerCase(), undefined, {
                            sensitivity: "base",
                          })
                      )
                      .map((item) => (
                        <tr
                          key={item.size_id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            #{item.size_id}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            {item.size_name}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={()=>{
                                  setSelectedSize(item);
                                }}
                              className="text-slate-400 hover:text-[#135bec] transition-colors">
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(item);
                                }}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            
            {/* Mobile Cards View */}
            <div className="md:hidden grid gap-4">
              {[...sizes]
                      .sort((a, b) =>
                        a.size_name
                          .toLowerCase()
                          .localeCompare(b.size_name.toLowerCase(), undefined, {
                            sensitivity: "base",
                          })
                      )
                      .map((item) => (
                <div key={item.size_id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 font-bold text-slate-700">
                           {item.size_name}
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-900">{item.size_name}</h3>
                           <p className="text-xs text-slate-500 font-mono">#{item.size_id}</p>
                        </div>
                     </div>
                     <div className="flex gap-1">
                        <button 
                                onClick={()=>{
                                  setSelectedSize(item);
                                }}
                              className="p-2 text-slate-400 hover:text-[#135bec] transition-colors">
                                <Pencil size={18} />
                        </button>
                        <button
                                onClick={() => {
                                  handleDelete(item);
                                }}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash size={18} />
                        </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
