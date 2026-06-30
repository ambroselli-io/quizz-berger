/*
  Warnings:

  - You are about to drop the column `include_program_first_week` on the `Prompt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProgramActivityForDay" ADD COLUMN     "ne_coincide_pas_avec" TEXT[];

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "include_program_first_week";
