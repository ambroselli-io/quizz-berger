/*
  Warnings:

  - You are about to drop the column `notifications` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "notifications",
ADD COLUMN     "notifications_subscription" "NotificationCategory"[] DEFAULT ARRAY['MORNING_NOTIFICATION']::"NotificationCategory"[];
