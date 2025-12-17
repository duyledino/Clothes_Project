/*
  Warnings:

  - Added the required column `color_code` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Color" ADD COLUMN     "color_code" TEXT NOT NULL;
