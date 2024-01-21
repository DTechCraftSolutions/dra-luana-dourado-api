import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

import { ProfessionalsRepository } from "../professionals-repository";

export class PrismaProfessionalsRepository implements ProfessionalsRepository {
  async findByEmail(email: string) {
    return prisma.professional.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.professional.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.ProfessionalCreateInput) {
    return prisma.professional.create({
      data,
    });
  }
}
