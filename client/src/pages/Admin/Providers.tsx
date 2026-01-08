import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Loading from "@/components/ui/Loading";
import {
  fetchDeleteAProvider,
  fetchGetAllProvider,
} from "@/slice/ProviderSlice";
import type { ProviderOrigin } from "@/type/types.frontend";
import { toast } from "react-toastify";
import UpdateProviderModal from "@/components/admin/UpdateProviderModal";
import { fetchUpdateAProvider } from "@/slice/ProviderSlice";

const Providers = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { loadingProvider, providers, total_provider } = useAppSelector(
    (state) => state.ProviderSlice
  );
  
  const [selectedProvider, setSelectedProvider] = useState<ProviderOrigin | null>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

  const onUpdate = async (provider_id: string, provider_name: string) => {
    if (!provider_id || !provider_name) {
      toast.error("Thiếu thông tin cập nhật");
      return;
    }
    const { type } = await dispatch(
      fetchUpdateAProvider({
        provider_id,
        provider_name,
      })
    );
    if (type.search("reject") == -1) {
      dispatch(fetchGetAllProvider());
      setIsOpenUpdateModal(false);
    }
  };

  useEffect(() => {
    if (selectedProvider != null) {
      setIsOpenUpdateModal(true);
    }
  }, [selectedProvider]);
  useEffect(() => {
    dispatch(fetchGetAllProvider());
  }, []);
  const handleDelete = async (item: ProviderOrigin) => {
    if (!item || item.provider_id === "") {
      toast.error("Thiếu mã nhà cung cấp");
      return;
    }
    const { type } = await dispatch(
      fetchDeleteAProvider({ provider_id: item.provider_id })
    );
    if (type.search("reject") == -1) {
      dispatch(fetchGetAllProvider());
    }
  };
  return (
    <>
      <UpdateProviderModal
        isOpen={isOpenUpdateModal}
        onClose={() => setIsOpenUpdateModal(false)}
        providerItem={selectedProvider}
        onUpdate={onUpdate}
      />
      {loadingProvider && <Loading />}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Providers
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your inventory suppliers and contact information.
            </p>
          </div>
          <Button
            onClick={() => {
              router("AddProvider");
            }}
            className="gap-2 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add Provider
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search provider name or ID..."
              className="pl-10 bg-background"
            />
          </div>
        </div>

        {/* Custom Table using Tailwind */}
        {/* Custom Table using Tailwind */}
        <div className="hidden md:block rounded-[--radius] border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                <tr>
                  <th className="px-6 py-4">Provider Name</th>
                  <th className="px-6 py-4">Provider ID</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {providers &&
                  providers.length > 0 &&
                  providers.map((item) => (
                    <tr
                      key={item.provider_id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-secondary rounded-lg">
                            <Building2 className="h-4 w-4 text-secondary-foreground" />
                          </div>
                          <span className="font-semibold text-foreground">
                            {item.provider_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-tight">
                          {item.provider_id}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            onClick={() => {
                              setSelectedProvider(item);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              handleDelete(item);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Footer info */}
          <div className="px-6 py-3 border-t border-border bg-muted/20">
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              Total Providers: {total_provider}
            </p>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid gap-4 mb-4">
            {providers && providers.length > 0 && providers.map((item) => (
                <div key={item.provider_id} className="bg-white p-4 rounded-lg shadow-sm border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary rounded-lg">
                        <Building2 className="w-4 h-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{item.provider_name}</h3>
                        <p className="text-xs text-muted-foreground font-mono">{item.provider_id}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                           <Button
                            onClick={() => {
                              setSelectedProvider(item);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              handleDelete(item);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                    </div>
                  </div>
                </div>
            ))}
             {/* Mobile Footer info */}
            <div className="px-4 py-2 bg-muted/20 rounded-lg">
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium text-center">
                Total Providers: {total_provider}
                </p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Providers;
