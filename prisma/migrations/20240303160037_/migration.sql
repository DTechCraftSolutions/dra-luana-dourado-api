-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('PLANO', 'PARTICULAR');

-- CreateEnum
CREATE TYPE "RoleStatus" AS ENUM ('CANCELADO', 'ATENDIDO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "RoleTypeProcedure" AS ENUM ('COMUM', 'RECORRENTE');

-- CreateEnum
CREATE TYPE "OfficeType" AS ENUM ('DENTIST', 'SECRETARY');

-- CreateTable
CREATE TABLE "professionals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "office" "OfficeType" NOT NULL,
    "CRO" TEXT,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "responsible_name" TEXT,
    "responsible_cpf" TEXT,
    "responsible_rg" TEXT,
    "birth_date_responsible" TEXT,
    "telphone_responsible" TEXT,
    "comments_responsible" TEXT,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "RoleStatus" NOT NULL,
    "type" "RoleType" NOT NULL,
    "procedureId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "availableTimeId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_times" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "initial_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,

    CONSTRAINT "available_times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RoleTypeProcedure" NOT NULL,
    "duration" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "professionals"("email");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_availableTimeId_fkey" FOREIGN KEY ("availableTimeId") REFERENCES "available_times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_times" ADD CONSTRAINT "available_times_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
