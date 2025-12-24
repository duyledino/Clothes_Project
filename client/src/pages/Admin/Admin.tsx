"use client";
import Sidebar from "@/components/admin/Sidebar";
import Dashboard from "@/components/admin/Dashboard";
import React, { useState } from "react";
import Inventory from "./Inventory";
import ProductDetail from "../Public/ProductDetail";
import User_Management from "./User_Management";
import OrderDetail from "./OrderDetail";
import InventoryImport from "@/components/admin/InventoryImport";
import InventoryImportDetail from "@/components/admin/InventoryImportDetail";

function Admin() {

  return (
    <div className="flex">
      <div className="flex-1">
        {page === "dashboard" && <Dashboard />}
        {page === "inventory" && <Inventory />}
      </div>
    </div>
  );
}

export default Admin;
