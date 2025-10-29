/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "user_detail_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_detail" (
    "id" SERIAL NOT NULL,
    "phone_no" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "user_detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_detail_id_key" ON "user"("user_detail_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_user_detail_id_fkey" FOREIGN KEY ("user_detail_id") REFERENCES "user_detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
