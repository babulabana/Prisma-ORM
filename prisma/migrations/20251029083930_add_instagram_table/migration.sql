-- CreateTable
CREATE TABLE "instagrams" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "followers" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "instagrams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "instagrams" ADD CONSTRAINT "instagrams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
