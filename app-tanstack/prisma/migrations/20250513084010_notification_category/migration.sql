-- CreateEnum
CREATE TYPE "NotificationCategory" AS ENUM ('MORNING_NOTIFICATION');

-- AlterTable
ALTER TABLE "NotificationLog" ADD COLUMN     "category" "NotificationCategory";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notifications" "NotificationCategory"[];
