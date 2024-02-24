import { Prisma, Budget } from "@prisma/client";

export interface BudgetRepository {
  create(budget: Prisma.BudgetCreateInput): Promise<Budget>;
}
