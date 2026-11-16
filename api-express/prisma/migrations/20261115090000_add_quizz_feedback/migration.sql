-- CreateTable
CREATE TABLE "QuizzFeedback" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "answersCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,

    CONSTRAINT "QuizzFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizzFeedback_createdAt_idx" ON "QuizzFeedback"("createdAt");

-- AddForeignKey
ALTER TABLE "QuizzFeedback" ADD CONSTRAINT "QuizzFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
