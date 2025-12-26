import React, { useState } from "react";
import { ArrowLeft, Save, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Loading from "@/components/ui/Loading";
import type { ProviderOrigin } from "@/type/types.frontend";
import { toast } from "react-toastify";
import { providerService } from "@/service/provider.service";
import { fetchCreateAProvider } from "@/slice/ProviderSlice";
import { useNavigate } from "react-router-dom";

const AddProvider = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const [providerId, setProviderId] = useState<string>("");
  const [providerName, setProviderName] = useState<string>("");
  const { loadingProvider } = useAppSelector((state) => state.ProviderSlice);
  const handleSave = async () => {
    if (providerName === "") {
      toast.error("Tên nhà cung cấp không được trống");
      return;
    }
    const { type } = await dispatch(
      fetchCreateAProvider({
        provider_id: providerId,
        provider_name: providerName,
      })
    );
    if (type.search("reject") == -1) {
      toast.success("Đã thêm nhà cung cấp thành công");
      setProviderId("");
      setProviderName("");
    }
  };
  return (
    <>
      {loadingProvider && <Loading />}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              router(-1);
            }}
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Register Provider
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new business partner to your supply chain.
            </p>
          </div>
        </div>

        <div>
          {/* Visual Accent */}

          <div className="p-8 space-y-8">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-[--radius] border border-border border-dashed">
              <div className="bg-background p-3 rounded-full shadow-sm">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Provider Identity</h3>
                <p className="text-xs text-muted-foreground">
                  Ensure the name matches their official business registration.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="provider_name"
                  className="text-sm font-semibold"
                >
                  Mã nhà cung cấp{" "}
                  <span className="text-gray-400">(Hoặc tự động khởi tạo)</span>
                </Label>
                <Input
                  onChange={(e) => {
                    setProviderId(e.target.value);
                  }}
                  value={providerId}
                  id="provider_name"
                  placeholder="e.g. Mã của nhà cung cấp"
                  className="py-6 bg-background focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="provider_name"
                  className="text-sm font-semibold"
                >
                  Tên nhà cung cấp
                </Label>
                <Input
                  onChange={(e) => {
                    setProviderName(e.target.value);
                  }}
                  value={providerName}
                  id="provider_name"
                  placeholder="e.g. Tên của nhà cung cấp"
                  className="py-6 bg-background focus-visible:ring-primary"
                />
              </div>

              <div className="flex items-start gap-2 pt-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4 mt-0.5 text-primary" />
                <p className="text-xs leading-relaxed italic">
                  By adding this provider, you will be able to select them when
                  creating
                  <strong> Stock Receipts</strong> to update your warehouse
                  inventory.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-muted/10 border-t border-border flex items-center justify-end gap-3">
            <Button
              onClick={() => {
                setProviderId("");
                setProviderName("");
              }}
              variant="ghost"
              className="hover:bg-background"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSave();
              }}
              className="gap-2 px-8 font-medium"
            >
              <Save className="h-4 w-4" /> Save Provider
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProvider;
