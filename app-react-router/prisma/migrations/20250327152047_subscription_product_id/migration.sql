/*
  Warnings:

  - The `subscription_product_id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SubscriptionProductId" AS ENUM ('free_2025_03_06', 'program_2025_03_06', 'programme_coaching_2025_03_06');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscription_product_id",
ADD COLUMN     "subscription_product_id" "SubscriptionProductId";
