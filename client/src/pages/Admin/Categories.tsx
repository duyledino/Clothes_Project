import React from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  FolderTree,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const router = useNavigate();
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
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
        onClick={()=>{
            router("addCategory");
        }}
        className="flex items-center gap-2 bg-[#135bec] hover:bg-[#135bec]/90 text-primary-foreground px-4 py-2 rounded-[--radius] hover:opacity-90 transition-all text-sm font-medium shadow-sm">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Filters & Search */}
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

      {/* Table Container */}
      <div className="rounded-[--radius] border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
            <tr>
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4">Category ID</th>
              <th className="px-6 py-4 text-center">Linked Products</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {/* Example Category 1 */}
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <FolderTree className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <span className="font-medium text-foreground">Outerwear</span>
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                cat-8273-x912
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                  42 Products
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-destructive/10 rounded-md text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>

            {/* Example Category 2 */}
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <FolderTree className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <span className="font-medium text-foreground">
                    Accessories
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                cat-1102-p004
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                  128 Products
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-destructive/10 rounded-md text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-border bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
          <p>Showing 2 categories</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-border rounded hover:bg-background disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border border-border rounded hover:bg-background disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
