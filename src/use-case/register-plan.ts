import { Plan } from "@prisma/client";
import { PlanRepository } from "../repositories/plan-repository";

interface RegisterPlanRequest {
  name: string;
  duration: number;
  procedureId: string;
}

interface RegisterPlanResponse {
  plan: Plan;
}

export class RegisterPlanUseCase {
  constructor(private planRepository: PlanRepository) {}

  async execute({
    name,
    duration,
    procedureId,
  }: RegisterPlanRequest): Promise<RegisterPlanResponse> {
    const plan = await this.planRepository.create({
      name,
      duration,
      ProcedurePlan: { connect: { id: procedureId } },
    });

    return {
      plan,
    };
  }
}
