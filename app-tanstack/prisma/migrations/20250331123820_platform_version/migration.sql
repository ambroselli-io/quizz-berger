-- AlterTable
ALTER TABLE "User" ADD COLUMN     "last_app_opening_at" TIMESTAMP(3),
ADD COLUMN     "latest_version" TEXT,
ADD COLUMN     "platform" TEXT;
