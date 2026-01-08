/*
  Warnings:

  - The primary key for the `Chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `Chat` table. All the data in the column will be lost.
  - The primary key for the `Chat_Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `Chat_Message` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `Chat_Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Chat_Message` table. All the data in the column will be lost.
  - You are about to drop the `Chat_User` table. If the table is not empty, all the data it contains will be lost.
  - The required column `chat_id` was added to the `Chat` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `update_at` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id_admin` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id_user` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `Chat_Message` table without a default value. This is not possible if the table is not empty.
  - The required column `message_id` was added to the `Chat_Message` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `Chat_Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat_Message" DROP CONSTRAINT "Chat_Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Chat_Message" DROP CONSTRAINT "Chat_Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Chat_User" DROP CONSTRAINT "Chat_User_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Chat_User" DROP CONSTRAINT "Chat_User_userIdFrom_fkey";

-- DropForeignKey
ALTER TABLE "public"."Chat_User" DROP CONSTRAINT "Chat_User_userIdTo_fkey";

-- AlterTable
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_pkey",
DROP COLUMN "chatId",
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id_admin" TEXT NOT NULL,
ADD COLUMN     "user_id_user" TEXT NOT NULL,
ADD CONSTRAINT "Chat_pkey" PRIMARY KEY ("chat_id");

-- AlterTable
ALTER TABLE "public"."Chat_Message" DROP CONSTRAINT "Chat_Message_pkey",
DROP COLUMN "chatId",
DROP COLUMN "messageId",
DROP COLUMN "userId",
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "message_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "Chat_Message_pkey" PRIMARY KEY ("message_id");

-- DropTable
DROP TABLE "public"."Chat_User";

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_user_id_admin_fkey" FOREIGN KEY ("user_id_admin") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_user_id_user_fkey" FOREIGN KEY ("user_id_user") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_Message" ADD CONSTRAINT "Chat_Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_Message" ADD CONSTRAINT "Chat_Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
