/*
  Warnings:

  - You are about to drop the `PromoCodeToUse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromoCodeUsed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PromoCodeToUse" DROP CONSTRAINT "PromoCodeToUse_user_referral_id_fkey";

-- DropForeignKey
ALTER TABLE "PromoCodeUsed" DROP CONSTRAINT "PromoCodeUsed_code_fkey";

-- DropForeignKey
ALTER TABLE "PromoCodeUsed" DROP CONSTRAINT "PromoCodeUsed_user_id_fkey";

-- DropTable
DROP TABLE "PromoCodeToUse";

-- DropTable
DROP TABLE "PromoCodeUsed";

-- DropEnum
DROP TYPE "Advantage";
