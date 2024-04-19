import { Plan } from "@prisma/client";
import { PlanRepository } from "../repositories/plan-repository";

interface FetchAllPlansResponse {
  plans: Plan[];
}
export class FindAllPlansUseCase {
  constructor(private plansRepository: PlanRepository) {}

  async execute(): Promise<FetchAllPlansResponse> {
    const plans = await this.plansRepository.findAll();
    return {
      plans,
    };
  }
}
