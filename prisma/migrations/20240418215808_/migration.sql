-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "procedurePlanId" TEXT;

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

    CONSTRAINT "ProcedurePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "procedurePlanId" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_procedurePlanId_fkey" FOREIGN KEY ("procedurePlanId") REFERENCES "ProcedurePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedurePlan" ADD CONSTRAINT "ProcedurePlan_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_procedurePlanId_fkey" FOREIGN KEY ("procedurePlanId") REFERENCES "ProcedurePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
