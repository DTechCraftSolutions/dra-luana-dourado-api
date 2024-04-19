import { Prisma, ProcedurePlan } from "@prisma/client";

export interface ProcedurePlanRepository {
  create(procedurePlan: Prisma.ProcedurePlanCreateInput): Promise<void>;
}
