/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Provider` table. All the data in the column will be lost.
  - Added the required column `update_at` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Provider" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;
