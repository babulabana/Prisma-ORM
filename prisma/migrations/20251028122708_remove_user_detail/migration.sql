/*
  Warnings:

  - You are about to drop the `UserDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserDetail" DROP CONSTRAINT "UserDetail_userId_fkey";

-- DropTable
DROP TABLE "public"."UserDetail";
