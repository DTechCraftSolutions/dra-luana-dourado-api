import { Prisma, Budget } from "@prisma/client";

export interface BudgetRepository {
  findById(id: string): Promise<Budget | null>;
  create(budget: Prisma.BudgetCreateInput): Promise<Budget>;
  update(budget: Budget): Promise<Budget>;
}
