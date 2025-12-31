import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchDeleteARole, fetchGetAllRole } from "@/slice/RoleSlice";
import type { RoleOrigin } from "@/type/types.frontend";
import { toast } from "react-toastify";
import UpdateRoleModal from "@/components/admin/UpdateRoleModal";
import { fetchUpdateARole } from "@/slice/RoleSlice";
import Loading from "@/components/ui/Loading";

export default function Role() {
  const [query, setQuery] = useState("");
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { roles, loadingRole } = useAppSelector((state) => state.RoleSlice);
  
  const [selectedRole, setSelectedRole] = useState<RoleOrigin | null>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

  const onUpdate = async (role_id: string, role_name: string) => {
    if (!role_id || !role_name) {
      toast.error("Thiếu thông tin cập nhật");
      return;
    }
    const { type } = await dispatch(
      fetchUpdateARole({
        role_id,
        role_name,
      })
    );
    if (type.search("reject") == -1) {
      dispatch(fetchGetAllRole());
      setIsOpenUpdateModal(false);
    }
  };

  useEffect(() => {
    if (selectedRole != null) {
      setIsOpenUpdateModal(true);
    }
  }, [selectedRole]);
  useEffect(() => {
    dispatch(fetchGetAllRole());
  }, []);
  const handleDelete = async (item: RoleOrigin) => {
    if (!item || item.role_id === "") {
      toast.error("Không tìm thấy mã role");
      return;
    }
    const { type } = await dispatch(
      fetchDeleteARole({ role_id: item.role_id })
    );
    if (type.search("reject") == -1) {
      dispatch(fetchGetAllRole());
    }
  };
  return (
    <>
      <UpdateRoleModal
        isOpen={isOpenUpdateModal}
        onClose={() => setIsOpenUpdateModal(false)}
        roleItem={selectedRole}
        onUpdate={onUpdate}
      />
      {loadingRole && <Loading />}
      <div className="flex h-[calc(100vh-0px)] w-full overflow-hidden bg-[#f6f6f8] text-slate-900">
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col gap-4 flex-shrink-0 z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Role Management
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Manage user roles and permissions.
                </p>
              </div>
              <button
                onClick={() => {
                  router("AddRole");
                }}
                className="bg-[#135bec] hover:bg-[#135bec]/90 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus size={20} strokeWidth={2.5} />
                Add New Role
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
                  placeholder="Search by role name..."
                  type="text"
                />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto bg-slate-50 p-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-24">
                        ID
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                        Role Name
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-24 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {roles.map((role) => (
                      <tr
                        key={role.role_id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          #{role.role_id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {role.role_name}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                            onClick={()=>{
                              setSelectedRole(role);
                            }}
                            className="text-slate-400 hover:text-[#135bec] transition-colors">
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(role);
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
