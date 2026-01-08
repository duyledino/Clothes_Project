/*
  Warnings:

  - A unique constraint covering the columns `[verify_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[forget_password_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_verify_token_key" ON "public"."User"("verify_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_forget_password_token_key" ON "public"."User"("forget_password_token");
