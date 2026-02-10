/*
  Warnings:

  - The primary key for the `QuestionnaireAnswer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `QuestionnaireAnswer` table. All the data in the column will be lost.
  - Added the required column `question_user_id` to the `QuestionnaireAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionnaireAnswer" DROP CONSTRAINT "QuestionnaireAnswer_pkey",
DROP COLUMN "id",
ADD COLUMN     "question_user_id" TEXT NOT NULL,
ADD CONSTRAINT "QuestionnaireAnswer_pkey" PRIMARY KEY ("question_user_id");
