"use client";
import Sidebar from "@/components/admin/Sidebar";
import Dashboard from "@/components/admin/Dashboard";
import React, { useState } from "react";
import Inventory from "./Inventory_Duy";
import ProductDetail from "../Public/ProductDetail";
import User_Management from "./User_Management";
import OrderDetail from "./OrderDetail";
import InventoryImport from "@/components/admin/InventoryImport";
import InventoryImportDetail from "@/components/admin/InventoryImportDetail";



function Admin() {
const [page, setPage] = useState<
"dashboard" | "inventory" | "import" | "importDetail" | "User_Management" | "OrderDetail"
>("dashboard");

  
  return (
    <div className="flex">
      {/* Sidebar (nếu có) */}
      <div className="w-64">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("inventory")}>Inventory</button>
      </div>

      <div className="flex-1">
        {page === "dashboard" && <Dashboard />}
        {page === "inventory" && <Inventory />}
      </div>
    </div>
  );

};

export default Admin;
