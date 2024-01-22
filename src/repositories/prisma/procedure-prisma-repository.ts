import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { Procedure } from "@prisma/client";

import { ProcedureRepository } from "../procedure-repository";

export class PrismaProceduresRepository implements ProcedureRepository {
  async create(data: Prisma.ProcedureCreateInput) {
    return prisma.procedure.create({
      data,
    });
  }

  async update(procedure: Procedure) {
    const { id, name, duration, type } = procedure;
    return prisma.procedure.update({
      where: {
        id,
      },
      data: {
        name,
        duration,
        type,
      },
    });
  }

  async findById(id: string) {
    return prisma.procedure.findUnique({
      where: {
        id,
      },
    });
  }
}
