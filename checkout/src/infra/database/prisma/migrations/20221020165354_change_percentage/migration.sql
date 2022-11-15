/*
  Warnings:

  - Changed the type of `percentage` on the `coupons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "percentage",
ADD COLUMN     "percentage" INTEGER NOT NULL;
