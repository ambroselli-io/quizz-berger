-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscription_paid_at" TIMESTAMP(3),
ADD COLUMN     "subscription_with_promo_code_at" TIMESTAMP(3);
