import { prisma } from "../../lib/prisma";
import { Budget, Prisma } from "@prisma/client";

import { BudgetRepository } from "../budget-repository";

export class PrismaBudgetRepository implements BudgetRepository {
  async create(budget: Prisma.BudgetCreateInput) {
    return prisma.budget.create({
      data: budget,
    });
  }

  async findById(id: string) {
    return prisma.budget.findUnique({
      where: {
        id,
      },
    });
  }

  async update(budget: Budget) {
    const { id, price } = budget;
    return prisma.budget.update({
      where: {
        id,
      },
      data: {
        price,
      },
    });
  }
}
