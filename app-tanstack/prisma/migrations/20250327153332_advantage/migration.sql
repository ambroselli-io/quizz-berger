/*
  Warnings:

  - The `advantage` column on the `PromoCodeToUse` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PromoCodeToUse" DROP COLUMN "advantage",
ADD COLUMN     "advantage" "Advantage";
