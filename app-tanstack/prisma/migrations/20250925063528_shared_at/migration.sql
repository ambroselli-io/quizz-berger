/*
  Warnings:

  - You are about to drop the column `shared_badge` on the `Bilan66Days` table. All the data in the column will be lost.
  - You are about to drop the column `shared_referral` on the `Bilan66Days` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bilan66Days" DROP COLUMN "shared_badge",
DROP COLUMN "shared_referral",
ADD COLUMN     "shared_badge_at" TIMESTAMP(3),
ADD COLUMN     "shared_referral_at" TIMESTAMP(3);
