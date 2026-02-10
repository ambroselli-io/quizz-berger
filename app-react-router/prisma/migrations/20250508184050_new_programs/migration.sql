-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SubscriptionProductId" ADD VALUE 'program_2025_03_06_50_off';
ALTER TYPE "SubscriptionProductId" ADD VALUE 'programme_coaching_2025_03_06_50_off';
