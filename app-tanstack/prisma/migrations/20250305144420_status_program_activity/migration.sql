/*
  Warnings:

  - You are about to drop the column `success` on the `ProgramActivityForDay` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProgramActivityStatus" AS ENUM ('TODO', 'SUCCESS', 'FAILURE');

-- AlterTable
ALTER TABLE "ProgramActivityForDay" DROP COLUMN "success",
ADD COLUMN     "status" "ProgramActivityStatus" NOT NULL DEFAULT 'TODO';
