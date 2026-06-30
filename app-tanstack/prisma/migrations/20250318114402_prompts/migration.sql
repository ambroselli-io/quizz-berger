-- CreateEnum
CREATE TYPE "PromptType" AS ENUM ('USER_PROFILE', 'CONSEIL');

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" "PromptType" NOT NULL,
    "include_user_profile" BOOLEAN NOT NULL DEFAULT false,
    "include_user_answers" BOOLEAN NOT NULL DEFAULT false,
    "include_user_conseils" BOOLEAN NOT NULL DEFAULT false,
    "include_program_first_week" BOOLEAN NOT NULL DEFAULT false,
    "include_full_program" BOOLEAN NOT NULL DEFAULT false,
    "include_activities" BOOLEAN NOT NULL DEFAULT false,
    "include_output_language" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);
