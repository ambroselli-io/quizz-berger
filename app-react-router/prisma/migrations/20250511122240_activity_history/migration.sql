/*
  Warnings:

  - You are about to drop the column `objectif` on the `ProgramActivityForDay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProgramActivityForDay" DROP COLUMN "objectif",
ADD COLUMN     "history" TEXT[];
