-- AlterTable
ALTER TABLE "public"."Cart" ALTER COLUMN "update_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Cart_Detail" ALTER COLUMN "update_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Inventory" ALTER COLUMN "create_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "update_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "update_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "update_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "create_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "update_at" DROP DEFAULT;
