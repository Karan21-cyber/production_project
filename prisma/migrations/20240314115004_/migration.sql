/*
  Warnings:

  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupAdmin` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "groupAdmin" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "latestMessage" DROP NOT NULL;

-- DropTable
DROP TABLE "_ChatToUser";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_groupAdmin_fkey" FOREIGN KEY ("groupAdmin") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
