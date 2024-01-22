import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { Patient } from "@prisma/client";

import { PatientsRepository } from "../patient-repository";

export class PrismaPatientsRepository implements PatientsRepository {
  async create(data: Prisma.PatientCreateInput) {
    return prisma.patient.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.patient.findUnique({
      where: {
        email,
      },
    });
  }
  async findById(id: string) {
    return prisma.patient.findUnique({
      where: {
        id,
      },
    });
  }

  async update(Patient: Patient) {
    const { id, name, phone, email } = Patient;
    return prisma.patient.update({
      where: {
        id,
      },
      data: {
        name,
        phone,
        email,
      },
    });
  }
}
