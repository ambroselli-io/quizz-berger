-- AlterEnum
ALTER TYPE "SubscriptionProductId" ADD VALUE 'coaching_one_shot_2025_09_24';

-- CreateTable
CREATE TABLE "Coachings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coachings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coachings" ADD CONSTRAINT "Coachings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
