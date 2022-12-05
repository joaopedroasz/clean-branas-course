-- CreateEnum
CREATE TYPE "StockOperation" AS ENUM ('add', 'remove');

-- CreateTable
CREATE TABLE "StockEntry" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "operation" "StockOperation" NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "StockEntry_pkey" PRIMARY KEY ("id")
);
