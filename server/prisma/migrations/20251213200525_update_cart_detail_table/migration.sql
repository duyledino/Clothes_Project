/*
  Warnings:

  - Added the required column `active` to the `Cart_Detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cart_Detail" ADD COLUMN     "active" BOOLEAN NOT NULL;
