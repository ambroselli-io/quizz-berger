/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Bilan66Days` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bilan66Days_user_id_key" ON "Bilan66Days"("user_id");
