/*
  Warnings:

  - The `pricePlan` column on the `schedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "pricePlan",
ADD COLUMN     "pricePlan" INTEGER;
