/*
  Warnings:

  - You are about to drop the column `forget_password_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verify_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "forget_password_at",
DROP COLUMN "verify_at",
ADD COLUMN     "expire_forget_password_at" TIMESTAMP(3),
ADD COLUMN     "expire_verify_at" TIMESTAMP(3);
