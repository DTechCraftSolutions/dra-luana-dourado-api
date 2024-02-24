import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

import { BudgetRepository } from "../budget-repository";

export class PrismaBudgetRepository implements BudgetRepository {
  async create(budget: Prisma.BudgetCreateInput) {
    return prisma.budget.create({
      data: budget,
    });
  }
}
