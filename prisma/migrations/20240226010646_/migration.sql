/*
  Warnings:

  - You are about to drop the column `email` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `patients` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_number` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comments` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `road` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "patients_email_key";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "birth_date" TEXT NOT NULL,
ADD COLUMN     "card_number" INTEGER NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "rg" TEXT NOT NULL,
ADD COLUMN     "road" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;
