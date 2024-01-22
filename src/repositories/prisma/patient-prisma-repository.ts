import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

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
}
