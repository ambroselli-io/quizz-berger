/*
  Warnings:

  - You are about to drop the column `notifications` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `web_push_tokens` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "notifications",
DROP COLUMN "web_push_tokens";
