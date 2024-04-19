import { Plan, Prisma } from "@prisma/client";

export interface PlanRepository {
  findById(id: string): Promise<Plan | null>;
  findAll(): Promise<Plan[]>;
  create(data: Prisma.PlanCreateInput): Promise<Plan>;
}
