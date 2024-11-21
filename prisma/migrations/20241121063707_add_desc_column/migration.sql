-- CreateTable
CREATE TABLE "ScamNews" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScamNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScamVotes" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "scamNewsId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ScamVotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScamNews_title_key" ON "ScamNews"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ScamNews_slug_key" ON "ScamNews"("slug");

-- AddForeignKey
ALTER TABLE "ScamVotes" ADD CONSTRAINT "ScamVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScamVotes" ADD CONSTRAINT "ScamVotes_scamNewsId_fkey" FOREIGN KEY ("scamNewsId") REFERENCES "ScamNews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
