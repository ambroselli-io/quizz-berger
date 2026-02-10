/*
  Warnings:

  - The values [free_2025_03_06] on the enum `SubscriptionProductId` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionProductId_new" AS ENUM ('program_2025_03_06', 'program_2025_03_06_10_off', 'program_2025_03_06_20_off', 'program_2025_03_06_30_off', 'program_2025_03_06_50_off', 'programme_coaching_2025_03_06', 'programme_coaching_2025_03_06_50_off');
ALTER TABLE "User" ALTER COLUMN "subscription_product_id" TYPE "SubscriptionProductId_new" USING ("subscription_product_id"::text::"SubscriptionProductId_new");
ALTER TYPE "SubscriptionProductId" RENAME TO "SubscriptionProductId_old";
ALTER TYPE "SubscriptionProductId_new" RENAME TO "SubscriptionProductId";
DROP TYPE "SubscriptionProductId_old";
COMMIT;
