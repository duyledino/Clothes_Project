-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_shipper_id_fkey";

-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "shipper_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_shipper_id_fkey" FOREIGN KEY ("shipper_id") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
