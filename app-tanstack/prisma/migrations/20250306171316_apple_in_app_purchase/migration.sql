-- CreateTable
CREATE TABLE "AppleInAppEvent" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppleInAppEvent_pkey" PRIMARY KEY ("id")
);
