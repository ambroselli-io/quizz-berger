/*
  Warnings:

  - Made the column `question` on table `QuestionnaireAnswer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "QuestionnaireAnswer" ALTER COLUMN "question" SET NOT NULL;
