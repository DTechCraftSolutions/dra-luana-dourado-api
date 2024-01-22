/*
  Warnings:

  - You are about to drop the column `password_hash` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `patients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "password_hash",
DROP COLUMN "status";
