/*
  Warnings:

  - You are about to drop the column `habitudes_cache` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "habitudes_cache",
ADD COLUMN     "bonnes_habitudes_cache" TEXT[];
