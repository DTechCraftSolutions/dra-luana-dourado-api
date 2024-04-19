/*
  Warnings:

  - You are about to drop the column `procedureId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `pricePlan` on the `schedules` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_procedureId_fkey";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "procedureId";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "active",
DROP COLUMN "pricePlan";

-- CreateTable
CREATE TABLE "ProcedurePlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "recurrence" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "planId" TEXT,

    CONSTRAINT "ProcedurePlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_procedurePlanId_fkey" FOREIGN KEY ("procedurePlanId") REFERENCES "ProcedurePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedurePlan" ADD CONSTRAINT "ProcedurePlan_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedurePlan" ADD CONSTRAINT "ProcedurePlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
