import React, { useEffect, useState } from "react";
import { Plus, Trash2, Save, ArrowLeft, PackagePlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchGetAllProvider } from "@/slice/ProviderSlice";
import { fetchProductFromApiAdmin } from "@/slice/ProductSlice";
import ProductSearchModalForAddStock from "@/components/admin/ProductSearchModalForAddStock";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StockReceipt, StockReceiptDetail } from "@/type/types.frontend";
import { toast } from "react-toastify";
import {
  fetchCreateStockReceipt,
  fetchGetInventoryBySearchingNameOrId,
} from "@/slice/InventorySlice";
import Loading from "@/components/ui/Loading";

const AddStockReceipt = () => {
  const [query, setQuery] = useState<string>("");
  const [stockDetail, setStockDetail] = useState<StockReceiptDetail[]>([]);
  const [providerId, setProviderId] = useState<string>("");
  // const [userId,]
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const { ProductsAdmin } = useAppSelector((state) => state.ProductSlice);
  const { InventoriesSearch, loadingInventory } = useAppSelector(
    (state) => state.InventorySlice
  );
  const { user } = useAppSelector((state) => state.AuthSlice);
  // const {} = useAppSelector(state=>state.ColorSlice);
  const { providers, loadingProvider } = useAppSelector(
    (state) => state.ProviderSlice
  );
  // const {} = useAppSelector(state=>state.);
  //   useEffect(() => {
  //     dispatch(fetchGetAllProvider());
  //     dispatch(fetchProductFromApiAdmin());
  //   }, []);
  // const
  useEffect(() => {
    dispatch(fetchGetAllProvider());
  }, []);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(fetchGetInventoryBySearchingNameOrId(query));
    }, 750);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [query]);
  const handleSaveReceipt = async () => {
    if (providerId === "" || !user || !user.user || stockDetail.length == 0) {
      toast.error("Chưa đủ thông tin");
      return;
    }
    const { type } = await dispatch(
      fetchCreateStockReceipt({
        provider_id: providerId,
        user_id: user.user.user_id,
        stock_receipt_detail: stockDetail,
      })
    );
    if (type.search("reject") == -1) {
      toast.success("Đã thêm phiếu nhập thành công");
      setProviderId("");
      setStockDetail([]);
      dispatch(fetchGetAllProvider());
    }
  };
  console.log("stockDetail: ", stockDetail);
  const handleDelete = (item: StockReceiptDetail) => {
    const exists = stockDetail.find(
      (itemDel) => itemDel.inventory_id === item.inventory_id
    );
    if (!exists) {
      toast.error("Không tìm thấy tồn kho này");
      return;
    }
    setStockDetail(
      (prev) =>
        (prev = prev.filter(
          (itemDel) => itemDel.inventory_id !== item.inventory_id
        ))
    );
  };
  return (
    <>
      {(loadingProvider || loadingInventory) && <Loading />}
      {open && (
        <ProductSearchModalForAddStock
          setStockDetail={setStockDetail}
          stockDetail={stockDetail}
          InventoriesSearch={InventoriesSearch}
          query={query}
          setQuery={setQuery}
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          // onSelect={}
        />
      )}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Create Stock Receipt
              </h1>
              <p className="text-muted-foreground text-sm">
                Import new inventory items from providers.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-[--radius] border border-border bg-background hover:bg-accent text-sm font-medium transition-colors">
              Cancel
            </button>
            <button
              onClick={() => {
                handleSaveReceipt();
              }}
              className="px-4 py-2 rounded-[--radius] bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Receipt
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: General Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-[--radius] border border-border bg-card text-card-foreground shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Receipt Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Provider
                  </label>
                  <Select
                    onValueChange={(e) => {
                      setProviderId(e);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {providers.map((item) => (
                          <SelectItem value={`${item.provider_id}`}>
                            {item.provider_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Handled By (User)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user?.user.user_id}
                    className="w-full bg-muted border border-input rounded-[--radius] px-3 py-2 text-sm text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Receipt Date
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full bg-background border border-input rounded-[--radius] px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[--radius] border border-border bg-card text-card-foreground shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Quantity:</span>
                  <span className="font-medium">
                    {stockDetail.reduce((pre, cur) => (pre += cur.quantity), 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inventory Items */}
          <div className="lg:col-span-2">
            <div className="rounded-[--radius] border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="text-lg font-semibold">Items to Restock</h2>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="text-xs flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Row
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Variation (Size/Color)</th>
                      <th className="px-4 py-3 w-32">Quantity</th>
                      <th className="px-4 py-3 w-16 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {stockDetail &&
                      stockDetail.length > 0 &&
                      stockDetail.map((item) => (
                        <tr
                          // inventory_id is individual for each (product_id,color_id,size_id)
                          key={item.inventory_id}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-4 py-4">
                            <select className="w-full bg-transparent border-none focus:ring-0 outline-none p-0">
                              <option>{item.product_name}</option>
                            </select>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <select className="bg-background border border-input rounded px-2 py-1 text-xs outline-none">
                                <option>Size {item.size_id}</option>
                              </select>
                              <select
                                style={{ backgroundColor: `${item.color_id}` }}
                                className="bg-background border border-input rounded px-2 py-1 text-xs outline-none"
                              ></select>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <input
                              onChange={(e) => {
                                console.log(
                                  "Chagen quenaity: ",
                                  e.target.value
                                );
                                setStockDetail((prev) =>
                                  prev.map((itemInc) => {
                                    if (
                                      itemInc.inventory_id === item.inventory_id
                                    ) {
                                      return {
                                        ...itemInc,
                                        quantity: Number(e.target.value),
                                      };
                                    }
                                    return itemInc;
                                  })
                                );
                              }}
                              type="number"
                              min="1"
                              value={item.quantity}
                              placeholder="1"
                              className="w-full bg-background border border-input rounded px-2 py-1 text-sm outline-none"
                            />
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => {
                                handleDelete(item);
                              }}
                              className="text-destructive hover:bg-destructive/10 p-1.5 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-border bg-muted/20">
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="w-full py-2 border-2 border-dashed border-border rounded-[--radius] text-muted-foreground hover:bg-background hover:text-foreground transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add New Product Line
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStockReceipt;
