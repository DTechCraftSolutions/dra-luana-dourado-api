import { Plan } from "@prisma/client";
import { PlanRepository } from "../repositories/plan-repository";

interface RegisterPlanRequest {
  name: string;
  duration: number;
}

interface RegisterPlanResponse {
  plan: Plan;
}

export class RegisterPlanUseCase {
  constructor(private planRepository: PlanRepository) {}

  async execute({
    name,
    duration,
  }: RegisterPlanRequest): Promise<RegisterPlanResponse> {
    const plan = await this.planRepository.create({
      name,
      duration,
    });

    return {
      plan,
    };
  }
}
