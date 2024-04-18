/*
  Warnings:

  - You are about to drop the column `procedurePlanId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the `ProcedurePlan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `procedureId` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_procedurePlanId_fkey";

-- DropForeignKey
ALTER TABLE "ProcedurePlan" DROP CONSTRAINT "ProcedurePlan_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_procedurePlanId_fkey";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "procedurePlanId",
ADD COLUMN     "procedureId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "active" TEXT,
ADD COLUMN     "pricePlan" TEXT;

-- DropTable
DROP TABLE "ProcedurePlan";

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
