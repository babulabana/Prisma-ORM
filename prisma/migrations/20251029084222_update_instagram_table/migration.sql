/*
  Warnings:

  - You are about to drop the column `userId` on the `instagrams` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `instagrams` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `instagrams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `instagrams` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."instagrams" DROP CONSTRAINT "instagrams_userId_fkey";

-- AlterTable
ALTER TABLE "instagrams" DROP COLUMN "userId",
DROP COLUMN "username",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "instagrams" ADD CONSTRAINT "instagrams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
