import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import type { InventoryInAdmin } from "@/type/types.frontend";

interface UpdateInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventoryItem: InventoryInAdmin | null;
  onUpdate: (inventory_id: string, new_min_quantity: number) => void;
}

const UpdateInventoryModal = ({
  isOpen,
  onClose,
  inventoryItem,
  onUpdate,
}: UpdateInventoryModalProps) => {
  const [minQuantity, setMinQuantity] = useState<number | string>("");

  useEffect(() => {
    if (inventoryItem) {
      setMinQuantity(inventoryItem.min_quantity);
    }
  }, [inventoryItem]);

  if (!isOpen || !inventoryItem) return null;

  const handleSave = async () => {
    const qty = Number(minQuantity);
    if (isNaN(qty) || qty < 0) {
      toast.error("Số không âm và phải là số");
      return;
    }
    onUpdate(inventoryItem.inventory_id, qty);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-[--radius] border border-border shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              Update Inventory Limit
            </h3>
            <p className="text-xs text-muted-foreground">
              Set the minimum stock alert level
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
          
          {/* Item Details Card */}
          <div className="bg-secondary/20 rounded-lg p-4 border border-border/50 flex gap-4 items-start">
             <div className="w-16 h-16 rounded-md bg-white border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                {inventoryItem.product.imageUrl ? (
                    <img 
                        src={inventoryItem.product.imageUrl} 
                        alt={inventoryItem.product.product_name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-xs text-muted-foreground">No Img</div>
                )}
             </div>
             <div className="flex-1 space-y-1">
                <h4 className="font-medium text-foreground text-sm line-clamp-2">
                    {inventoryItem.product.product_name}
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="px-1.5 py-0.5 rounded-md bg-background border border-border shadow-sm">
                        {inventoryItem.size_id}
                    </span>
                     <span className="px-1.5 py-0.5 rounded-md bg-background border border-border shadow-sm flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full inline-block border border-border/50" style={{ backgroundColor: inventoryItem.color_id }}></span> 
                        {inventoryItem.color_id}
                    </span>
                </div>
                 <div className="text-xs font-medium text-primary pt-1">
                    Current Stock: {inventoryItem.quantity}
                 </div>
             </div>
          </div>

          {/* Input Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
                Minimum Quantity Alert
            </label>
            <div className="relative">
                <input
                    type="number"
                    min="0"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(e.target.value)}
                    className="flex h-10 w-full rounded-[--radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. 10"
                />
            </div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <AlertCircle className="w-3 h-3"/> 
                The system will alert when stock falls below this value.
            </p>
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
            <>
                <Save className="w-4 h-4" /> Save Changes
            </>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInventoryModal;
