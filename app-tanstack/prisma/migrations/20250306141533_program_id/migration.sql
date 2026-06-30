/*
  Warnings:

  - Added the required column `program_id` to the `ProgramActivityForDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProgramActivityForDay" ADD COLUMN     "program_id" TEXT NOT NULL;
