import { Budget } from "@prisma/client";
import { BudgetRepository } from "../repositories/budget-repository";

interface RegisterBudgetRequest {
  price: number;
}

interface RegisterBudgetResponse {
  budget: Budget;
}

export class RegisterBudgetUseCase {
  constructor(private budgetRepository: BudgetRepository) {}

  async execute({
    price,
  }: RegisterBudgetRequest): Promise<RegisterBudgetResponse> {
    const budget = await this.budgetRepository.create({
      price,
    });

    return { budget };
  }
}
