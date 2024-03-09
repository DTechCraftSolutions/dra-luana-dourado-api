/*
  Warnings:

  - You are about to drop the column `type` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `color` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurrence` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "type",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "recurrence" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RoleTypeProcedure";
