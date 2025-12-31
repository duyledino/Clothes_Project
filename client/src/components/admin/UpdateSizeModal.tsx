import { useState, useEffect } from "react";
import { X, Save, Ruler } from "lucide-react";
import { toast } from "react-toastify";
import type { SizeOrigin } from "@/type/types.frontend";

interface UpdateSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeItem: SizeOrigin | null;
  onUpdate: (size_id: string, size_name: string) => void;
}

const UpdateSizeModal = ({
  isOpen,
  onClose,
  sizeItem,
  onUpdate,
}: UpdateSizeModalProps) => {
  const [sizeName, setSizeName] = useState<string>("");

  useEffect(() => {
    if (sizeItem) {
      setSizeName(sizeItem.size_name);
    }
  }, [sizeItem]);

  if (!isOpen || !sizeItem) return null;

  const handleSave = async () => {
    if (!sizeName.trim()) {
      toast.error("Tên size không được để trống");
      return;
    }
    onUpdate(sizeItem.size_id, sizeName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-[--radius] border border-border shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              Update Size
            </h3>
            <p className="text-xs text-muted-foreground">
              Modify size name
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Details Card */}
          <div className="bg-secondary/20 rounded-lg p-4 border border-border/50 flex gap-4 items-center">
             <div className="w-12 h-12 rounded-md bg-secondary border border-border flex items-center justify-center text-secondary-foreground">
                <Ruler className="w-6 h-6" />
             </div>
             <div className="flex-1 space-y-1">
                <div className="text-xs text-muted-foreground uppercase font-mono">
                    ID: {sizeItem.size_id}
                </div>
                 <div className="text-sm font-medium text-foreground">
                   Original: {sizeItem.size_name}
                 </div>
             </div>
          </div>

          {/* Input Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
                Size Name
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={sizeName}
                    onChange={(e) => setSizeName(e.target.value)}
                    className="flex h-10 w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter size name"
                />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-muted/20 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-[--radius] transition-colors text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 rounded-[--radius] transition-all shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSizeModal;
