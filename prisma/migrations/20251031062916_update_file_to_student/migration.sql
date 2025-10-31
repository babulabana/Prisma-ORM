/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "fileUrl",
ADD COLUMN     "file_url" TEXT;
