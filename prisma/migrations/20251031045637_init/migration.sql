-- CreateTable
CREATE TABLE "instagram_posts" (
    "id" SERIAL NOT NULL,
    "caption" TEXT,
    "instagram_id" INTEGER NOT NULL,

    CONSTRAINT "instagram_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instagrams" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "followers" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "instagrams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "id" SERIAL NOT NULL,
    "phone_no" TEXT,
    "age" INTEGER,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "user_detail_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_detail_id_key" ON "users"("user_detail_id");

-- AddForeignKey
ALTER TABLE "instagram_posts" ADD CONSTRAINT "instagram_posts_instagram_id_fkey" FOREIGN KEY ("instagram_id") REFERENCES "instagrams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instagrams" ADD CONSTRAINT "instagrams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_detail_id_fkey" FOREIGN KEY ("user_detail_id") REFERENCES "user_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;
