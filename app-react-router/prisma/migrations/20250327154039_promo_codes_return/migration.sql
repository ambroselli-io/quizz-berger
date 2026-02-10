-- CreateTable
CREATE TABLE "PromoCodeToUse" (
    "code" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT true,
    "advantage" "Advantage",
    "max_uses" INTEGER,
    "user_referral_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCodeToUse_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "PromoCodeUsed" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCodeUsed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromoCodeToUse_code_key" ON "PromoCodeToUse"("code");

-- AddForeignKey
ALTER TABLE "PromoCodeToUse" ADD CONSTRAINT "PromoCodeToUse_user_referral_id_fkey" FOREIGN KEY ("user_referral_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCodeUsed" ADD CONSTRAINT "PromoCodeUsed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCodeUsed" ADD CONSTRAINT "PromoCodeUsed_code_fkey" FOREIGN KEY ("code") REFERENCES "PromoCodeToUse"("code") ON DELETE CASCADE ON UPDATE CASCADE;
