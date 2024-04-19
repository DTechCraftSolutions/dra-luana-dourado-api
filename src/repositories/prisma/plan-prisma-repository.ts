import { Plan } from "@prisma/client";
import { PlanRepository } from "../plan-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPlansRepository implements PlanRepository {
  async findAll(): Promise<Plan[]> {
    return await prisma.plan.findMany();
  }
  async findById(id: string): Promise<Plan | null> {
    return await prisma.plan.findUnique({
      where: {
        id,
      },
    });
  }

  async create({ name, duration }: Plan): Promise<Plan> {
    return await prisma.plan.create({
      data: {
        name,
        duration,
      },
    });
  }
}
