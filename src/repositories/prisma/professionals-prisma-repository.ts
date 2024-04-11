import { prisma } from "../../lib/prisma";
import { Prisma, Professional } from "@prisma/client";

import { ProfessionalsRepository } from "../professionals-repository";

export class PrismaProfessionalsRepository implements ProfessionalsRepository {
  async delete(id: string) {
    prisma.professional.delete({
      where: {
        id,
      },
    });
  }
  async update(professional: Professional) {
    return prisma.professional.update({
      where: {
        id: professional.id,
      },
      data: professional,
    });
  }
  async findByName(name: string) {
    return prisma.professional.findFirstOrThrow({
      where: {
        name,
      },
    });
  }
  async findAll() {
    return prisma.professional.findMany();
  }
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
