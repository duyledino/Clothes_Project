-- AlterTable
ALTER TABLE "public"."Inventory" ALTER COLUMN "update_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "payment" SET DEFAULT 'pending',
ALTER COLUMN "status" SET DEFAULT 'pending';
