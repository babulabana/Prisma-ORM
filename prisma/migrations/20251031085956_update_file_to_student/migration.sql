/*
  Warnings:

  - You are about to drop the column `file_url` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "file_url",
ADD COLUMN     "file" TEXT;
