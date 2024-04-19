import { Prisma } from "@prisma/client";
import { ProcedurePlanRepository } from "../procedure-plan-prisma-repository";
import { prisma } from "../../lib/prisma";

export class PrismaProcedurePlanRepository implements ProcedurePlanRepository {
  async create(data: Prisma.ProcedurePlanCreateInput) {
    await prisma.procedurePlan.create({
      data,
    });
  }
}
