-- CreateTable
CREATE TABLE "instagram_posts" (
    "id" SERIAL NOT NULL,
    "caption" TEXT,
    "instagram_id" INTEGER NOT NULL,

    CONSTRAINT "instagram_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "instagram_posts" ADD CONSTRAINT "instagram_posts_instagram_id_fkey" FOREIGN KEY ("instagram_id") REFERENCES "instagrams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
