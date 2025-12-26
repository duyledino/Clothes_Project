import React from 'react';
import { ArrowLeft, Save, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const router = useNavigate();
    return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
          onClick={()=>{
            router("/Admin/Category");
          }}
          className="p-2 hover:bg-secondary rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Add New Category</h1>
        </div>
      </div>

      <div className="bg-card overflow-hidden">
        <div className="p-6 space-y-6">
          {/* General Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-4 h-4" />
              <h2 className="text-sm font-semibold uppercase tracking-wider">Category Details</h2>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category_name" className="text-sm font-medium text-foreground">
                Category Name
              </label>
              <input 
                id="category_name"
                type="text" 
                placeholder="e.g. Summer Collection, Footwear..." 
                className="w-full bg-background border border-input rounded-[--radius] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/50"
              />
              <p className="text-[11px] text-muted-foreground">
                Give your category a unique and descriptive name. This will be visible to customers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-[--radius] bg-muted/30 border border-border">
            <h3 className="text-xs font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Note
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Once created, you can start assigning products to this category from the 
              <strong> Product Management</strong> screen. The Category ID will be automatically generated.
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="p-4 bg-muted/20 border-t border-border flex items-center justify-end gap-3">
          <button className="px-4 py-2 text-sm font-medium rounded-[--radius] border border-border bg-background hover:bg-accent transition-colors">
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-[--radius] bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm">
            <Save className="w-4 h-4" />
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;