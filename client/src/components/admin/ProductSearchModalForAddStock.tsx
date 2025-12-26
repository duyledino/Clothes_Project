import React, { type Dispatch, type SetStateAction } from "react";
import { Search, X, Check, Package } from "lucide-react";
import type {
  InventoryInSearchAdmin,
  StockReceiptDetail,
} from "@/type/types.frontend";
import { toast } from "react-toastify";

interface ProductSearchModalProps {
  stockDetail: StockReceiptDetail[];
  setStockDetail: Dispatch<SetStateAction<StockReceiptDetail[]>>;
  isOpen: boolean;
  InventoriesSearch: InventoryInSearchAdmin[];
  onClose: () => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  // products and onSelect are kept in interface for type-safety but unused in the UI logic below
  //   products?: any[];
  //   onSelect?: (product: any) => void;
}

const ProductSearchModalForAddStock = ({
  InventoriesSearch,
  query,
  setQuery,
  isOpen,
  onClose,
  setStockDetail,
  stockDetail,
}: ProductSearchModalProps) => {
  if (!isOpen) return null;
  const handleClick = (item: InventoryInSearchAdmin) => {
    console.log("current select: ", item);
    const exists = stockDetail.find(
      (itemStock) => itemStock.inventory_id === item.inventory_id
    );
    if (exists) {
      toast.error("Đã thêm vào phiếu nhập rồi");
      return;
    }
    setStockDetail(
      (prev) =>
        (prev = [
          ...prev,
          {
            color_id: item.color_id,
            inventory_id: item.inventory_id,
            product_id: item.product_id,
            size_id: item.size_id,
            quantity: 1,
            product_name: item.product.product_name
          },
        ])
    );
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-2xl rounded-[--radius] border border-border shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              Select Product
            </h3>
            <p className="text-xs text-muted-foreground">
              Search through 1,000+ items in your catalog
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Section */}
        <div className="p-4 bg-background">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
              autoFocus
              type="text"
              placeholder="Search by Product ID (e.g. 'PROD-123') or Name..."
              className="w-full bg-background border border-input rounded-[--radius] pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 min-h-[400px] space-y-1">
          {InventoriesSearch.length == 0 && (
            <h1 className="text-center">Không tìm thấy trong tồn kho</h1>
          )}
          {InventoriesSearch &&
            InventoriesSearch.length > 0 &&
            InventoriesSearch.map((item) => (
              <div
                key={
                  item.inventory_id +
                  item.color_id +
                  item.size_id +
                  item.product_id
                }
                className="flex items-center justify-between p-3 rounded-[--radius] hover:bg-secondary/50 cursor-pointer group transition-colors border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden border border-border">
                    <Package className="w-6 h-6 text-muted-foreground opacity-50" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {item.product.product_name}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                      ID: {item.product_id}, {item.size_id},{" "}
                      <span
                        style={{ backgroundColor: `${item.color_id}` }}
                        className="inline-block w-3.5 h-3.5"
                      ></span>
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      SL tồn: {item.quantity}
                    </p>
                    <p className="font-medium text-sm text-foreground">
                      SL tồn min: {item.min_quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleClick(item)}
                  className="opacity-0 group-hover:opacity-100 bg-primary text-primary-foreground text-xs px-4 py-2 rounded-[--radius] flex items-center gap-2 transition-all font-medium shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  Choose Product
                </button>
              </div>
            ))}
        </div>

        {/* Modal Footer (Optional Action) */}
        <div className="p-3 bg-muted/20 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-[--radius] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchModalForAddStock;
