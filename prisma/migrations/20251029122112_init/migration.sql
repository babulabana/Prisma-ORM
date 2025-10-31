/*
  Warnings:

  - You are about to drop the `instagram_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instagrams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."instagram_posts" DROP CONSTRAINT "instagram_posts_instagram_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."instagrams" DROP CONSTRAINT "instagrams_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_user_detail_id_fkey";

-- DropTable
DROP TABLE "public"."instagram_posts";

-- DropTable
DROP TABLE "public"."instagrams";

-- DropTable
DROP TABLE "public"."users";

-- DropTable
DROP TABLE "public"."users_details";
