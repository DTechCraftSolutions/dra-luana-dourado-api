/*
  Warnings:

  - Added the required column `availableTimeId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "availableTimeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "available_times" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,

    CONSTRAINT "available_times_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_availableTimeId_fkey" FOREIGN KEY ("availableTimeId") REFERENCES "available_times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_times" ADD CONSTRAINT "available_times_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
