/*
  Warnings:

  - The values [ATENDIDO] on the enum `RoleStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleStatus_new" AS ENUM ('AGUARDANDO', 'EM_ATENDIMENTO', 'CANCELADO', 'FINALIZADO', 'REAGENDADO', 'PENDENTE');
ALTER TABLE "Schedule" ALTER COLUMN "status" TYPE "RoleStatus_new" USING ("status"::text::"RoleStatus_new");
ALTER TYPE "RoleStatus" RENAME TO "RoleStatus_old";
ALTER TYPE "RoleStatus_new" RENAME TO "RoleStatus";
DROP TYPE "RoleStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "type";

-- DropEnum
DROP TYPE "RoleType";
