/*
  Warnings:

  - You are about to drop the column `description` on the `ProgramActivityForDay` table. All the data in the column will be lost.
  - Added the required column `title` to the `ProgramActivityForDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProgramActivityForDay" DROP COLUMN "description",
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
