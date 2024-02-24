import { Budget } from "@prisma/client";
import { BudgetRepository } from "../repositories/budget-repository";

interface UpdateBudgetRequest {
  id: string;
  price?: number;
}

interface UpdateBudgetResponse {
  budget: Budget;
}

export class UpdateBudgetUseCase {
  constructor(private budgetRepository: BudgetRepository) {}

  async execute({
    id,
    price,
  }: UpdateBudgetRequest): Promise<UpdateBudgetResponse> {
    const budget = await this.budgetRepository.findById(id);

    if (!budget) {
      throw new Error("Budget not found");
    }

    if (price) budget.price = price;

    await this.budgetRepository.update(budget);

    return { budget };
  }
}
