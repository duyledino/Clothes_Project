/*
  Warnings:

  - You are about to drop the column `category_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_category_id_fkey";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "category_id";

-- CreateTable
CREATE TABLE "public"."Product_Category" (
    "product_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Product_Category_pkey" PRIMARY KEY ("product_id","category_id")
);

-- AddForeignKey
ALTER TABLE "public"."Product_Category" ADD CONSTRAINT "Product_Category_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product_Category" ADD CONSTRAINT "Product_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
