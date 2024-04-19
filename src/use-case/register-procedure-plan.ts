import { ProcedurePlan } from "@prisma/client";
import { ProcedurePlanRepository } from "../repositories/procedure-plan-prisma-repository";

interface RegisterProcedurePlanRequest {
  name: string;
  recurrence: string;
  duration: string;
  color: string;
  price: number;
  description: string;
  professionalId: string;
  active: string;
  planId?: string;
}

interface RegisterProcedurePlanResponse {}

export class RegisterProcedurePlanUseCase {
  constructor(private procedurePlanRepository: ProcedurePlanRepository) {}

  async execute({
    name,
    recurrence,
    duration,
    color,
    price,
    description,
    professionalId,
    planId,
    active,
  }: RegisterProcedurePlanRequest): Promise<void> {
    if (!planId) {
      throw new Error("Plan not found");
    }
    const procedurePlan = await this.procedurePlanRepository.create({
      name,
      recurrence,
      duration,
      color,
      price,
      description,
      active,
      professionals: { connect: { id: professionalId } },
      Plan: { connect: { id: planId } },
    });
  }
}
