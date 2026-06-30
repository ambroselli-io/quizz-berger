/*
  Warnings:

  - The `history` column on the `ProgramActivityForDay` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProgramActivityForDay" DROP COLUMN "history",
ADD COLUMN     "history" JSONB;
