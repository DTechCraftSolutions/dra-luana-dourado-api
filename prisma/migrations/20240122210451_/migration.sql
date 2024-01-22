/*
  Warnings:

  - Added the required column `patientId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('PLANO', 'PARTICULAR');

-- CreateEnum
CREATE TYPE "RoleStatus" AS ENUM ('CANCELADO', 'ATENDIDO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "RoleTypeProcedure" AS ENUM ('COMUM', 'RECORRENTE');

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "status" "RoleStatus" NOT NULL,
ADD COLUMN     "type" "RoleType" NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "RoleTypeProcedure" NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
