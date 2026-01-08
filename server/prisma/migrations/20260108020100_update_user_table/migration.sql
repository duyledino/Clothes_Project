-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "forget_password_at" TIMESTAMP(3),
ADD COLUMN     "forget_password_token" TEXT,
ADD COLUMN     "isVerify" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verify_at" TIMESTAMP(3),
ADD COLUMN     "verify_token" TEXT;
