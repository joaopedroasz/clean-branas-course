/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `coupons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "coupon_code" TEXT,
    "code" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freight" INTEGER,
    "sequence" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_code_key" ON "orders"("code");

-- CreateIndex
CREATE UNIQUE INDEX "orders_cpf_key" ON "orders"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_coupon_code_fkey" FOREIGN KEY ("coupon_code") REFERENCES "coupons"("code") ON DELETE SET NULL ON UPDATE CASCADE;
