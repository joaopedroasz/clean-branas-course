/*
  Warnings:

  - A unique constraint covering the columns `[sequence]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_sequence_key" ON "orders"("sequence");
