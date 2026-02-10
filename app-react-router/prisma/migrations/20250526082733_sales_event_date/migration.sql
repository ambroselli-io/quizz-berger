/*
  Warnings:

  - Added the required column `date` to the `SalesEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesEvent" ADD COLUMN     "date" TEXT NOT NULL;
