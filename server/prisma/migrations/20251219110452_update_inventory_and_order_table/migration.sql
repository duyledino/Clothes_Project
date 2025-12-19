-- AlterTable
ALTER TABLE "public"."Inventory" ADD COLUMN     "min_quantity" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "delivered_date" TIMESTAMP(3);
