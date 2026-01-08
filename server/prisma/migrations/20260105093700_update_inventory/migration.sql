/*
  Warnings:

  - A unique constraint covering the columns `[product_id,size_id,color_id]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventory_product_id_size_id_color_id_key" ON "public"."Inventory"("product_id", "size_id", "color_id");
