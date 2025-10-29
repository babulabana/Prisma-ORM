/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_userDetailId_fkey";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserDetail";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "user_detail_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_details" (
    "id" SERIAL NOT NULL,
    "phone_no" TEXT,
    "age" INTEGER,

    CONSTRAINT "users_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_detail_id_key" ON "users"("user_detail_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_detail_id_fkey" FOREIGN KEY ("user_detail_id") REFERENCES "users_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;
