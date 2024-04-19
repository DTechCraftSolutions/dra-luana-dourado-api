/*
  Warnings:

  - Added the required column `active` to the `ProcedurePlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProcedurePlan" ADD COLUMN     "active" TEXT NOT NULL;
