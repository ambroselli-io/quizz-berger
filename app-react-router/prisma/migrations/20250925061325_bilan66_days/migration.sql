-- CreateTable
CREATE TABLE "Bilan66Days" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TEXT,
    "accomplishments" TEXT,
    "surprises" TEXT,
    "challenges" TEXT,
    "feedback" TEXT,
    "newsletter_weekly" BOOLEAN DEFAULT false,
    "newsletter_monthly" BOOLEAN DEFAULT false,
    "contact_in_3_months" BOOLEAN DEFAULT false,
    "coaching_session_requested" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bilan66Days_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bilan66Days" ADD CONSTRAINT "Bilan66Days_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
