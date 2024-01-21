/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `professionals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "professionals" DROP CONSTRAINT "professionals_scheduleId_fkey";

-- AlterTable
ALTER TABLE "professionals" DROP COLUMN "scheduleId";
