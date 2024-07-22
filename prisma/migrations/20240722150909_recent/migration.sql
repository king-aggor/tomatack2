/*
  Warnings:

  - Added the required column `password` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Retailer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Wholesaler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Retailer" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wholesaler" ADD COLUMN     "password" TEXT NOT NULL;
